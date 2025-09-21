export function initNavbar(rootEl) {
  const nav = rootEl.querySelector('.js-nav, #siteNav');
  const burger = rootEl.querySelector('.js-burger, #burger');
  const menu = rootEl.querySelector('.menu');

  if (!nav || !burger || !menu) return;

  if (nav.dataset.initialized === 'true') return;
  nav.dataset.initialized = 'true';

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (getComputedStyle(burger).display !== 'none') {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  });
  const menuLinks = rootEl.querySelectorAll('.menu a');
  // normaliza path actual
  let path = location.pathname.replace(/\/+$/, '');     // sin slash final
  if (path === '' || path === '/') path = '/index.html';

  // limpia estados previos
  menuLinks.forEach(a => a.classList.remove('active'));

  // busca match por pathname (soporta href absolutos o relativos)
  let matched = false;
  for (const a of menuLinks) {
    const aURL = new URL(a.getAttribute('href'), location.origin);
    const aPath = aURL.pathname.replace(/\/+$/, '');
    // match por archivo o por slug (con o sin .html)
    if (aPath === path ||
      aPath === path.replace(/\.html$/, '') ||
      (aPath.endsWith('/index.html') && path === '/index.html')) {
      a.classList.add('active');
      matched = true;
      break;
    }
  }

  // fallback: marca Inicio si nada coincidió
  if (!matched) {
    const home = Array.from(menuLinks).find(a =>
      /(^|\/)index(\.html)?$|^\/$/.test(a.getAttribute('href') || '')
    );
    (home || menuLinks[0])?.classList.add('active');
  }
}
