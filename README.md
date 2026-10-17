# Web de Derívate

Sitio institucional estático de [Derívate](https://derivatestem.github.io/Webpage/), construido con HTML, CSS y JavaScript. No requiere instalación de paquetes ni compilación.

La dirección temporal es **https://derivatestem.github.io/Webpage/**. El dominio `derivate.org.pe` se retiró de GitHub Pages porque su DNS devuelve `NXDOMAIN`. El repositorio se publica sin `CNAME` mientras se resuelve esa configuración.

## Ejecutar localmente

Desde la raíz del repositorio, con Python instalado:

```sh
python -m http.server 8000
```

Abrir [http://localhost:8000](http://localhost:8000). Servir mediante HTTP: el encabezado y el pie compartidos se cargan con `fetch`, por lo que abrir los HTML directamente con `file://` no permite comprobar correctamente el sitio.

## Verificar el sitio

Desde la raíz del repositorio:

```sh
python scripts/check_site.py
git diff --check
```

El comprobador usa la biblioteca estándar de Python y revisa las páginas, los componentes compartidos y los CSS enlazados. Detecta recursos locales inexistentes o con mayúsculas incorrectas, fragmentos rotos, IDs duplicados, páginas sin un único `h1`, imágenes sin `alt` y enlaces a otra pestaña sin `noopener`. Termina con código 1 si encuentra problemas. También admite `python scripts/check_site.py --root /ruta/al/sitio`.

## Páginas

| Archivo | Contenido |
| --- | --- |
| `index.html` | Inicio, comunidad, programas, encuentros y novedades. |
| `conocenos.html` | Propósito y forma de trabajo de Derívate. |
| `equipo.html` | Directorio único de miembros, mentores y asesores académicos; búsqueda por nombre y filtros de tipo e institución. |
| `mentores.html` | Redirección de compatibilidad al filtro Mentores de Equipo; ya no es una sección independiente. |
| `summer-sprint.html` | Convocatoria, proyectos, seis mentores de la edición, galería de seis fotografías de Research Sprint 2026 y orientación para postular. |
| `proyecto-*.html` | Seis fichas completas de proyectos de Summer Sprint 2027, con requisitos, dedicación, tareas y materiales de postulación. Cada tarjeta abre únicamente la ficha correspondiente. |
| `EntreFisicos.html` | Anuncio de Entre Físicos 2027 y tarjetas de ediciones anteriores que abren sus galerías. |
| `EntreFisicos2025.html` | Galería independiente de nueve fotografías de 2025, con visor ampliado. |
| `EntreFisicos2026.html` | Galería independiente de nueve fotografías de 2026, con visor ampliado. |
| `RIFP.html` | Archivo de la Reunión Internacional de Físicos en Posgrado 2024. |
| `novedades.html` | Archivo de publicaciones de la comunidad. |

## Estructura compartida

- `components/header.html`: logo, navegación y enlace de postulación.
- `components/footer.html`: navegación secundaria, contacto, redes y enlace para volver arriba.
- `js/site.js`: carga ambos componentes, controla el menú móvil, marca la página activa, actualiza el año y cambia el estado de la convocatoria después del cierre.
- `css/site.css`: estilos generales, variables de color, tipografías, marca y adaptación a distintos tamaños de pantalla.
- `css/community-pages.css`, `css/event-pages.css` y `css/news-archive.css`: estilos de las páginas internas correspondientes.
- `css/entre-fisicos-gallery.css` y `js/entre-fisicos-gallery.js`: galerías adaptables de Entre Físicos 2025, Entre Físicos 2026 y Research Sprint 2026. El visor permite recorrer las fotos con botones y flechas del teclado; se cierra con Escape y devuelve el foco a la miniatura. Sin JavaScript, los enlaces abren las imágenes.
- `css/project-details.css`: presentación compartida de las seis fichas de proyectos. Se sirven como HTML completo, sin depender de JavaScript para consultar los requisitos.
- `assets/fonts/fonts.css`: fuentes WOFF2 autoalojadas con `font-display: swap`; sus licencias están en el mismo directorio.

Las galerías reúnen escenas de exposiciones, intercambio y presentación de pósteres. No muestran enlaces a los álbumes completos de Drive; sus referencias se conservan únicamente en la documentación de recursos.

Las páginas montan los componentes en `#navbar` y `#footer` e importan `js/site.js` como módulo. Al crear una página, conservar el enlace «Saltar al contenido», el contenido principal con `id="contenido"` y `id="top"` en el `body`.

## Directorio del equipo

La actualización del 15 de octubre de 2026 incorpora los 42 nombres y universidades de la hoja de miembros facilitada por el organizador, junto con Adrian Diaz Espinoza y los asesores académicos añadidos por indicación del organizador: Enrique Rojas Villalba y Pablo Palacios-Avila. La hoja es una fuente interna: no publicar su contenido completo, DNI, correos, becas ni otros datos personales ajenos a las fichas del equipo.

La reorganización del 16 de octubre de 2026 integra los 25 mentores únicos de las ediciones 2026 y 2027 en Equipo. El directorio actualizado reúne 71 personas: 42 miembros, 6 asesores y 25 mentores; Enrique Rojas y Pablo Palacios cuentan en las dos últimas categorías, con una sola ficha por persona. El filtro admite roles superpuestos. `equipo.html?tipo=mentor#equipo-heading` abre directamente los mentores; también se conserva el filtro de institución en la URL.

El directorio no usa carreras ni áreas organizativas. Mantiene las fotos y enlaces profesionales ya publicados de quienes continúan; las fichas sin fotografía muestran iniciales. Los nombres, instituciones y roles se escriben en el HTML, y `js/equipo.js` aplica los filtros de tipo e institución.

En las fichas de mentores, las instituciones son las de las referencias académicas enlazadas, con sus años y límites. No interpretarlas como cargos o afiliaciones actuales.

El perfil institucional de MIT Haystack confirma la afiliación de Enrique Rojas Villalba. La referencia de Waterloo de Pablo Palacios-Avila es de 2022: se enlaza con esa fecha, sin atribuirle una afiliación ni un grado actuales.

La actualización de asesores añade a Carlos Argüelles-Delgado (Harvard), Franz Danylo Machado Pérez (Illinois Tech) y Katterine Patricia Taipe Huamani (INSA Lyon), con referencias académicas en cada ficha. Los roles publicados se contrastaron con el perfil departamental de Harvard, la web académica de Franz y la página de supervisión de CNRS. La licenciatura en Física de Katterine también figura en el boletín oficial de la UNMSM de 2022. Su participación como asesores fue confirmada por el organizador.

Mariano Jesús Effio Cueva figura como estudiante de maestría en la Università di Padova según la actualización expresa del organizador. No se encontró una fuente pública que corrobore ese nuevo estado; no se publica una especialidad, fecha de ingreso ni grado obtenido. Se conserva su antecedente en Física en la UNI.

## Identidad visual y recursos

La referencia es [DERIVATE 2026 en Figma](https://www.figma.com/design/rT5DxMSxg7FqszLNDQTsQ1/DERIVATE-2026?node-id=252-272). La marca se toma del nodo `252:272`; las piezas de Summer Sprint están en los nodos [250:136](https://www.figma.com/design/rT5DxMSxg7FqszLNDQTsQ1/DERIVATE-2026?node-id=250-136) y [250:137](https://www.figma.com/design/rT5DxMSxg7FqszLNDQTsQ1/DERIVATE-2026?node-id=250-137).

La implementación usa `#FFC907` como amarillo, `#2E9DF7` como azul, `#101010` como fondo oscuro y `#F7F5F0` como fondo claro. Las variables están centralizadas al inicio de `css/site.css`. Las fuentes son Barlow Condensed 800, Inter 400–800 e IBM Plex Mono 400/500.

El isotipo y la marca tipográfica están en `assets/brand/`. La composición compartida del logo está definida por `.brand-lockup` en CSS: mantener la proporción del conjunto al cambiar su tamaño. Véase [origen de la marca](assets/brand/SOURCES.md).

Las fotografías históricas de `assets/img/`, los recursos de `assets/sprint/` y los favicons anteriores se conservan. Las páginas renovadas usan copias WebP de `assets/media/`; los originales no se sustituyen. Las copias conservan la imagen completa, aunque algunas vistas usan `object-fit` para adaptarla al contenedor. Véase [origen y optimización de imágenes](assets/media/SOURCES.md).

Equipo incorpora las fotos proporcionadas por el organizador para Katterine Taipe, Lucía Coll y Franz Machado, con encuadres centrados mediante CSS. El retrato de Carlos Argüelles procede de Harvard Gazette. La ampliación del 16 de octubre añade 23 retratos nominales verificados de asesores y mentores; los seis mentores de Summer Sprint también usan esas fotos. Miguel Agama conserva sus iniciales porque no se encontró una fotografía nominal verificable. Las copias completas, fuentes y créditos se conservan en la documentación de mantenimiento [retratos de 2026](assets/media/profiles/SOURCES-2026.md), sin créditos fotográficos visibles en las tarjetas.

La fotografía de Conócenos mantiene su proporción original y se muestra completa. Las seis tarjetas de proyectos de Summer Sprint son enlaces nativos completos a sus fichas de información y requisitos, con acceso por teclado. La sección de testimonios permanece oculta temporalmente.

## Summer Sprint 2027: datos confirmados

| Dato | Valor publicado |
| --- | --- |
| Cierre de postulaciones | 8 de noviembre de 2026. |
| Período del programa | 11 de enero–4 de abril de 2027. |
| Duración | 12 semanas. |
| Oferta | 6 proyectos y 8 vacantes. |
| Público | Estudiantes de Física. |
| Preferencias | Hasta tres proyectos, ordenados por prioridad. |
| Dedicación y modalidad | Varían según el proyecto; consultar el catálogo. |

Las fechas y el cierre fueron confirmados por el organizador para esta edición. Los proyectos, vacantes, dedicaciones, requisitos y nombres de mentores proceden del [catálogo oficial](https://docs.google.com/document/d/1heCBebyJ8vFON8CL4-Q94H1xfDQxgXMiHpcv8akLAnU/edit). La postulación enlaza al [formulario oficial proporcionado por el organizador](https://docs.google.com/forms/d/e/1FAIpQLSer-O7AxwhFLxkZRVWFDWsnfdM93cY9s3JdS6_UGH-F5nHD9g/viewform?usp=send_form).

El 16 de octubre de 2026 se trasladó la información sustantiva del documento a seis páginas propias. Los enlaces públicos de la web llevan a esas fichas y ya no al documento de Google Docs; el documento se conserva como fuente de mantenimiento. No sustituir las fichas por resúmenes que omitan requisitos o solicitudes adicionales. Los enlaces profesionales y el video que exige un proyecto se mantienen en su ficha correspondiente.

El catálogo establece cargas de 3–5, 6–9 y 10+ horas semanales según el proyecto. El proyecto de física teórica contempla reuniones preferentemente presenciales; por ello, la web no presenta una modalidad virtual ni una dedicación uniforme para todo el programa. Las afiliaciones de mentores describen su vínculo profesional y no constituyen anuncios de alianzas institucionales.

### Entre Físicos 2027 y mentores de otras ediciones

Entre Físicos 2027 se anuncia con «Inscripciones próximamente». La inscripción se realizará en Indico; añadir únicamente el enlace oficial cuando lo proporcione la organización. No hay fechas ni enlace de inscripción publicados para 2027.

Los mentores siguen formando parte de Derívate entre ediciones. Equipo reúne los seis perfiles de Summer Sprint 2027 y los 23 participantes de Research Sprint 2026 de la tabla 2 del registro entregado por la organización. Cuatro personas participaron en ambas ediciones y se unifican en una sola ficha. Summer Sprint muestra únicamente los seis mentores de su edición, con enlaces entre cada persona y su proyecto. La navegación principal y el pie ya no incluyen una sección independiente de Mentores. Se contrastaron nombres, áreas y afiliaciones con fuentes públicas el 14–15 de octubre de 2026; cada perfil de 2026 enlaza una referencia académica. Las afiliaciones históricas se presentan con su año cuando se conoce. No se publican grados o candidaturas que no pudieron corroborarse. La lista no incluye datos de mentees, correos ni teléfonos personales.

### Testimonios de Research Sprint 2026

`summer-sprint.html#testimonios` reserva dos tarjetas después de los mentores y antes de «Cómo postular». Ambas se muestran como «Próximamente» hasta recibir material real. Los bloques gráficos son decorativos; no representan a participantes ni contienen citas ficticias.

Para completar cada tarjeta, incorporar la foto autorizada dentro de `.testimonial-portrait`, con `alt` descriptivo y dimensiones explícitas. Sustituir el contenido pendiente por la cita en un `blockquote.testimonial-quote` y la atribución en `.testimonial-person`, con `.testimonial-name` y, si se confirma, `.testimonial-meta`. Retirar la clase `sprint-testimonial--pending`, el estado «Próximamente» y el `aria-label` provisional. No reutilizar datos de mentees del PDF para identificar a quienes darán su testimonio. Los estilos de esta sección están en `css/sprint-testimonials.css`.

### Actualizar una futura edición

1. Confirmar con la organización las fechas, el cierre, los proyectos, las vacantes, las modalidades, los requisitos, los mentores y los enlaces de catálogo y formulario.
2. Actualizar **`index.html`, `summer-sprint.html` y las seis fichas `proyecto-*.html`**: textos visibles, cifras, fechas, enlaces, títulos, metadescripciones y etiquetas sociales.
3. Actualizar **`js/site.js`**: fecha de cierre y destino interno de la convocatoria cerrada. Actualmente el umbral es `2026-11-09T00:00:00-05:00`, al terminar el 8 de noviembre en Lima. Mantener explícito el desfase `-05:00`.
4. Revisar `components/header.html`, `components/footer.html`, `equipo.html` y la sección `summer-sprint.html#mentores` para eliminar referencias o enlaces de la edición anterior.
5. Buscar en todo el sitio el año anterior, las fechas y los identificadores de los documentos antiguos para detectar referencias pendientes.
6. Verificar por HTTP, en escritorio y móvil, el menú, los botones de postulación, las imágenes y los enlaces a cada ficha de proyecto. Comprobar también el comportamiento de la convocatoria después de su cierre.

El script cambia los textos con `data-sprint-status` y los enlaces con `data-sprint-apply` cuando se carga la página después del umbral. Esta lógica usa el reloj del navegador y no cierra el formulario de Google ni reemplaza la actualización editorial de las fechas impresas.

## Contacto y enlaces institucionales

- Correo: [derivatesanmarcos@gmail.com](mailto:derivatesanmarcos@gmail.com).
- [Instagram](https://www.instagram.com/derivate.pe/).
- [LinkedIn](https://www.linkedin.com/company/derivatestem).
- [Facebook](https://www.facebook.com/profile.php?id=61555020923912).
- [Programa de Entre Físicos 2026](https://harvard-neutrinos.rc.fas.harvard.edu/event/31/overview), conservado como archivo de una edición pasada.

## Publicación y dominio

GitHub Pages sirve la raíz del repositorio en [la dirección temporal](https://derivatestem.github.io/Webpage/). Los enlaces internos y los recursos usan rutas relativas para conservar el prefijo `/Webpage/`. Las quince páginas incluyen `canonical`, `og:url` y `og:image` con esta base; `sitemap.xml` enumera las catorce páginas de contenido y excluye la redirección `mentores.html` y `robots.txt` incluye el enlace al sitemap. Revisar los cambios antes de incorporarlos a la rama utilizada por Pages.

### Restaurar `derivate.org.pe`

1. Resolver el registro y la configuración DNS del dominio. Comprobar que el DNS sea válido y apunte a GitHub Pages según la [documentación oficial de dominios personalizados](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). No restaurar el dominio personalizado mientras devuelva `NXDOMAIN`.
2. Cuando el DNS sea válido, abrir el repositorio **DerivateStem/Webpage → Settings → Pages**. En **Custom domain**, introducir `derivate.org.pe` y guardar. Si Pages publica desde una rama, GitHub crea el archivo `CNAME`; sincronizar ese cambio con la copia local.
3. Comprobar que Pages valide el DNS y que el certificado HTTPS esté disponible. Activar **Enforce HTTPS** cuando la opción esté habilitada y verificar que el sitio cargue en `https://derivate.org.pe/`.
4. Cambiar la base temporal por `https://derivate.org.pe/` en los metadatos de las quince páginas, en `sitemap.xml`, en la referencia al sitemap de `robots.txt` y en este README. Ajustar también `Allow` a `/`, ejecutar las verificaciones y publicar esos cambios junto con la restauración del dominio.
