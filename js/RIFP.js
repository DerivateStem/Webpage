// RIFP.js — interacciones de la página RIFP (1 solo DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
  /* =======================
     Menú móvil
  ======================= */
  const menuBtn = document.getElementById('open');
  const enlaces = document.getElementById('enlaces');
  if (menuBtn && enlaces) {
    menuBtn.addEventListener('click', () => {
      enlaces.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', enlaces.classList.contains('is-open'));
    });
  }

  /* =======================
     Header sticky (opcional)
  ======================= */
  const header = document.querySelector('header');
  const onScroll = () => header && header.classList.toggle('sticky', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* =======================
     Slider de galería
  ======================= */
  const sliderContainer = document.querySelector('.rifp-gallery-slider');
  if (sliderContainer) {
    const ul = sliderContainer.querySelector('ul');
    const slides = ul ? ul.querySelectorAll('li') : [];
    const prev = sliderContainer.querySelector('.prev');
    const next = sliderContainer.querySelector('.next');

    let idx = 0;
    const total = slides.length;
    const go = () => { if (ul) ul.style.transform = `translateX(-${idx * 100}%)`; };

    if (total > 1) {
      go();
      next?.addEventListener('click', () => { idx = (idx + 1) % total; go(); });
      prev?.addEventListener('click', () => { idx = (idx - 1 + total) % total; go(); });

      // Navegación por teclado
      sliderContainer.tabIndex = 0;
      sliderContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { idx = (idx + 1) % total; go(); }
        if (e.key === 'ArrowLeft')  { idx = (idx - 1 + total) % total; go(); }
      });

      // Swipe táctil
      let startX = 0, touching = false;
      sliderContainer.addEventListener('touchstart', (e) => {
        touching = true; startX = e.touches[0].clientX;
      }, { passive: true });

      sliderContainer.addEventListener('touchend', (e) => {
        if (!touching) return;
        const dx = e.changedTouches[0].clientX - startX;
        const TH = 50; // umbral
        if (dx > TH)  { idx = (idx - 1 + total) % total; go(); }
        if (dx < -TH) { idx = (idx + 1) % total; go(); }
        touching = false;
      });
    } else {
      prev && (prev.style.display = 'none');
      next && (next.style.display = 'none');
    }
  }

  /* =======================
     Flip de tarjetas
     (con soporte teclado)
  ======================= */
  const cards = document.querySelectorAll('.ponente-card');
  // Estado limpio al cargar
  document.querySelectorAll('.ponente-card.flipped').forEach(c => c.classList.remove('flipped'));

  cards.forEach((card) => {
    // accesibilidad
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    // click/tap
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    // teclado
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });

  /* =======================
     Manejo de errores en imágenes del reverso
     (si falla carga, mostramos placeholder limpio)
  ======================= */
  document.querySelectorAll('.ponente-foto').forEach((img) => {
    img.addEventListener('error', () => {
      img.classList.add('placeholder');   // fondo sólido definido en CSS
      img.removeAttribute('src');         // evita ícono de “imagen rota”
      img.setAttribute('aria-hidden', 'true');
      console.warn('[IMG 404]', img.alt || '(sin alt)');
    }, { once: true });
  });
});