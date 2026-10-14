#!/usr/bin/env python3
"""Check the static website with Python's standard library.

Run from any directory: python scripts/check_site.py
The --root option can point to another checkout. No network requests are made.
Header/footer fragments are checked in the pages where site.js mounts them.
Only stylesheets used by these pages, and their imports, are inspected.
"""

from __future__ import annotations

import argparse
from collections import defaultdict
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path, PurePosixPath
import posixpath
import re
import sys
from urllib.parse import unquote, urlsplit


@dataclass(frozen=True)
class Reference:
    value: str
    line: int
    tag: str
    attribute: str


class Document(HTMLParser):
    def __init__(self, path: Path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids: list[tuple[str, int]] = []
        self.anchors: set[str] = set()
        self.references: list[Reference] = []
        self.css: list[tuple[str, int]] = []
        self.issues: list[tuple[int, str]] = []
        self.h1_count = 0
        self.in_style = False
        self.feed(path.read_text(encoding="utf-8-sig"))
        self.close()

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        line = self.getpos()[0]
        if "id" in attributes:
            identifier = attributes["id"] or ""
            self.ids.append((identifier, line))
            self.anchors.add(identifier)
            if not identifier:
                self.issues.append((line, "id vacío"))
        if tag == "a" and attributes.get("name"):
            self.anchors.add(attributes["name"])
        if tag == "h1":
            self.h1_count += 1
        if tag == "img" and ("alt" not in attributes or attributes["alt"] is None):
            self.issues.append((line, "imagen sin atributo alt; usa alt=\"\" si es decorativa"))
        if tag in {"a", "area"} and (attributes.get("target") or "").lower() == "_blank":
            relations = (attributes.get("rel") or "").lower().split()
            if "noopener" not in relations:
                self.issues.append((line, "enlace target=\"_blank\" sin rel=\"noopener\""))
        for attribute in ("href", "src"):
            if attribute in attributes:
                self.references.append(Reference(attributes[attribute] or "", line, tag, attribute))
        if attributes.get("style"):
            self.css.append((attributes["style"], line))
        if tag == "style":
            self.in_style = True

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag == "style":
            self.in_style = False

    def handle_data(self, data):
        if self.in_style:
            self.css.append((data, self.getpos()[0]))


CSS_URL = re.compile(r"url\(\s*(?:(['\"])(.*?)\1|([^)]*?))\s*\)", re.I | re.S)
CSS_IMPORT = re.compile(r"@import\s+(['\"])(.*?)\1", re.I | re.S)


class SiteChecker:
    def __init__(self, root: Path):
        self.root = root.resolve()
        self.documents: dict[Path, Document] = {}
        self.errors: list[str] = []
        self.css_pending: set[Path] = set()
        self.css_checked: set[Path] = set()
        self.reference_count = 0
        self.mounts = {"navbar": "components/header.html", "footer": "components/footer.html"}

    def label(self, path: Path) -> str:
        return path.relative_to(self.root).as_posix()

    def error(self, source: Path, line: int, message: str):
        description = f"{self.label(source)}:{line}: {message}"
        if description not in self.errors:
            self.errors.append(description)

    def document(self, path: Path) -> Document | None:
        if path not in self.documents:
            try:
                self.documents[path] = Document(path)
            except (OSError, UnicodeError, ValueError) as error:
                self.error(path, 1, f"no se puede leer HTML: {error}")
                return None
        return self.documents[path]

    def exact_file(self, relative: str, source: Path, line: int, value: str) -> Path | None:
        """Check every path component, including on case-insensitive Windows."""
        current = self.root
        for part in PurePosixPath(relative).parts:
            try:
                names = {entry.name for entry in current.iterdir()}
            except OSError:
                self.error(source, line, f"ruta local inexistente: {value}")
                return None
            if part not in names:
                similar = sorted(name for name in names if name.casefold() == part.casefold())
                if similar:
                    self.error(source, line, f"mayúsculas incorrectas en {value}: {part!r} debe ser {similar[0]!r}")
                else:
                    self.error(source, line, f"recurso local inexistente: {value}")
                return None
            current = current / part
        if not current.is_file():
            self.error(source, line, f"la referencia no apunta a un archivo: {value}")
            return None
        return current

    def parts(self, page: Path) -> list[Document]:
        document = self.document(page)
        if document is None:
            return []
        parts = [document]
        ids = {identifier for identifier, _ in document.ids}
        for mount, relative in self.mounts.items():
            if mount in ids:
                component = self.exact_file(relative, page, 1, relative)
                if component:
                    fragment = self.document(component)
                    if fragment:
                        parts.append(fragment)
        return parts

    def check_reference(self, reference: Reference, source: Path, context: Path, *, css=False):
        self.reference_count += 1
        value = reference.value.strip()
        if not value:
            self.error(source, reference.line, f"atributo {reference.attribute} vacío en <{reference.tag}>")
            return
        try:
            url = urlsplit(value)
        except ValueError as error:
            self.error(source, reference.line, f"URL inválida {value!r}: {error}")
            return
        if url.scheme or url.netloc:
            return
        # CSS fragment-only URLs can refer to an SVG filter in the HTML document.
        if css and not url.path:
            return
        decoded = unquote(url.path)
        if "\\" in decoded or "\x00" in decoded:
            self.error(source, reference.line, f"ruta local inválida: {value}")
            return
        if not decoded:
            relative = self.label(context)
        elif decoded.startswith("/"):
            relative = posixpath.normpath(decoded.lstrip("/"))
        else:
            base = context.parent.relative_to(self.root).as_posix()
            relative = posixpath.normpath(posixpath.join(base, decoded))
        if relative == ".." or relative.startswith("../"):
            self.error(source, reference.line, f"ruta fuera del sitio: {value}")
            return
        if reference.tag in {"a", "area"} and (decoded.endswith("/") or relative == "."):
            relative = posixpath.join(relative, "index.html")
        target = self.exact_file(relative, source, reference.line, value)
        if target is None:
            return
        if target.suffix.lower() == ".css":
            self.css_pending.add(target)
        if url.fragment and target.suffix.lower() == ".html":
            fragment = unquote(url.fragment)
            # HTML defines #top as the top of the document, even without an ID.
            if fragment.lower() == "top":
                return
            anchors = set().union(*(part.anchors for part in self.parts(target)))
            if fragment not in anchors:
                self.error(source, reference.line, f"fragmento inexistente: {value} (desde {self.label(context)})")

    def check_css(self, text: str, source: Path, context: Path, start_line=1):
        text = re.sub(r"/\*.*?\*/", lambda match: "\n" * match[0].count("\n"), text, flags=re.S)
        for pattern in (CSS_URL, CSS_IMPORT):
            for match in pattern.finditer(text):
                value = match[2] if match[2] is not None else match[3]
                line = start_line + text[:match.start()].count("\n")
                self.check_reference(Reference(value, line, "css", "url"), source, context, css=True)

    def check_document(self, document: Document, context: Path):
        for line, issue in document.issues:
            self.error(document.path, line, issue)
        for reference in document.references:
            self.check_reference(reference, document.path, context)
        for text, line in document.css:
            self.check_css(text, document.path, context, line)

    def run(self) -> int:
        pages = sorted(self.root.glob("*.html"))
        if not pages:
            self.errors.append("No se encontraron páginas HTML en la raíz del sitio.")
        used_components: set[Path] = set()
        for page in pages:
            parts = self.parts(page)
            used_components.update(part.path for part in parts[1:])
            headings = sum(part.h1_count for part in parts)
            if headings != 1:
                self.error(page, 1, f"se esperaba 1 h1, se encontraron {headings}")
            ids: dict[str, list[str]] = defaultdict(list)
            for part in parts:
                for identifier, line in part.ids:
                    ids[identifier].append(f"{self.label(part.path)}:{line}")
                self.check_document(part, page)
            for identifier, locations in ids.items():
                if len(locations) > 1:
                    self.error(page, 1, f"id duplicado {identifier!r}: {', '.join(locations)}")
        # Check any additional fragments even if they are not mounted by site.js.
        components = sorted((self.root / "components").glob("*.html"))
        for component in components:
            if component in used_components:
                continue
            document = self.document(component)
            if document:
                self.check_document(document, self.root / "index.html")
                seen: set[str] = set()
                for identifier, line in document.ids:
                    if identifier in seen:
                        self.error(component, line, f"id duplicado {identifier!r}")
                    seen.add(identifier)
        while self.css_pending - self.css_checked:
            stylesheet = min(self.css_pending - self.css_checked)
            self.css_checked.add(stylesheet)
            try:
                self.check_css(stylesheet.read_text(encoding="utf-8-sig"), stylesheet, stylesheet)
            except (OSError, UnicodeError) as error:
                self.error(stylesheet, 1, f"no se puede leer CSS: {error}")
        if self.errors:
            print(f"ERROR: {len(self.errors)} problema(s).", file=sys.stderr)
            for error in self.errors:
                print(f"  - {error}", file=sys.stderr)
            return 1
        print(f"OK: {len(pages)} páginas, {len(components)} componentes, "
              f"{len(self.css_checked)} CSS y {self.reference_count} referencias verificadas.")
        return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1],
                        help="raíz del sitio (por defecto, la carpeta superior a scripts)")
    arguments = parser.parse_args()
    if not arguments.root.is_dir():
        print(f"ERROR: no existe la raíz del sitio: {arguments.root}", file=sys.stderr)
        return 1
    return SiteChecker(arguments.root).run()


if __name__ == "__main__":
    sys.exit(main())
