const navMount = document.getElementById('navbar');
const footerMount = document.getElementById('footer');

async function loadComponent(mount, file) {
  if (!mount) return;
  try {
    const response = await fetch(new URL(`../components/${file}`, import.meta.url), { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    mount.innerHTML = await response.text();
  } catch (error) {
    console.error(`No se pudo cargar ${file}:`, error);
    if (!mount.textContent.trim()) mount.innerHTML = '<div class="container nav-fallback"><a href="index.html">Derívate · Inicio</a><a href="summer-sprint.html">Summer Sprint 2027</a><a href="mailto:derivatesanmarcos@gmail.com">Contacto</a></div>';
  }
}

await Promise.all([loadComponent(navMount, 'header.html'), loadComponent(footerMount, 'footer.html')]);

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
function setMenu(open, restoreFocus = false) {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  if (restoreFocus) toggle.focus();
}
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  if (event.key === 'Tab' && toggle?.getAttribute('aria-expanded') === 'true') {
    const links = [...nav.querySelectorAll('a')];
    const last = links.at(-1);
    if (event.shiftKey && document.activeElement === toggle) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggle.focus(); }
  }
});
const desktop = window.matchMedia('(min-width: 1241px)');
desktop.addEventListener('change', event => { if (event.matches) setMenu(false); });
const page = location.pathname.split('/').pop() || 'index.html';
const activePage = page === 'EntreFisicos2026.html' ? 'EntreFisicos.html' : page;
nav?.querySelectorAll('a').forEach(link => {
  if (link.getAttribute('href') === activePage) link.setAttribute('aria-current', 'page');
});
document.querySelectorAll('[data-current-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });

// Do not leave a past application window labelled as open.
if (Date.now() > Date.parse('2026-11-09T00:00:00-05:00')) {
  document.querySelectorAll('[data-sprint-status]').forEach(node => { node.textContent = 'Convocatoria cerrada'; });
  document.querySelectorAll('[data-sprint-apply]').forEach(link => {
    link.textContent = 'Consultar convocatoria ↗';
    link.href = 'https://docs.google.com/document/d/1heCBebyJ8vFON8CL4-Q94H1xfDQxgXMiHpcv8akLAnU/edit';
  });
}
