// RIFP.js — Interacciones para la página RIFP.html
document.addEventListener('DOMContentLoaded', () => {
  /* =======================
     Menú móvil
  ======================= */
  const menuBtn = document.getElementById('open');
  const enlaces = document.getElementById('enlaces');
  if (menuBtn && enlaces) {
    menuBtn.addEventListener('click', () => {
      enlaces.classList.toggle('is-open');
      const isOpen = enlaces.classList.contains('is-open');
      menuBtn.classList.toggle('active', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* =======================
     Header sticky (opcional)
  ======================= */
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => header.classList.toggle('sticky', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =======================
     Slider de galería
  ======================= */
  const sliderContainer = document.querySelector('.rifp-gallery-slider');
  if (sliderContainer) {
    const slider = sliderContainer.querySelector('ul');
    const slides = slider ? slider.querySelectorAll('li') : [];
    const prevButton = sliderContainer.querySelector('.prev');
    const nextButton = sliderContainer.querySelector('.next');

    let currentIndex = 0;
    const totalSlides = slides.length;

    const updateSlider = () => {
      if (!slider) return;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    if (totalSlides <= 1) {
      prevButton && (prevButton.style.display = 'none');
      nextButton && (nextButton.style.display = 'none');
    } else {
      updateSlider();

      nextButton?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
      });

      prevButton?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
      });

      // Navegación con teclado
      sliderContainer.tabIndex = 0;
      sliderContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          currentIndex = (currentIndex + 1) % totalSlides;
          updateSlider();
        } else if (e.key === 'ArrowLeft') {
          currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
          updateSlider();
        }
      });

      // Swipe táctil
      let startX = 0;
      let touching = false;

      sliderContainer.addEventListener('touchstart', (e) => {
        touching = true;
        startX = e.touches[0].clientX;
      }, { passive: true });

      sliderContainer.addEventListener('touchend', (e) => {
        if (!touching) return;
        const dx = e.changedTouches[0].clientX - startX;
        const threshold = 50;
        if (dx > threshold) {
          currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
          updateSlider();
        } else if (dx < -threshold) {
          currentIndex = (currentIndex + 1) % totalSlides;
          updateSlider();
        }
        touching = false;
      });
    }
  }

  /* =======================
     Flip de tarjetas
  ======================= */
  document.querySelectorAll('.ponente-card').forEach((card) => {
    // Click/tap
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
    // Accesibilidad por teclado
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });

  /* =======================
     (Opcional) Si alguna imagen falla, no mostrar texto ALT
  ======================= */
  document.querySelectorAll('.ponente-foto').forEach((img) => {
    img.addEventListener('error', () => {
      img.classList.add('placeholder');
      img.removeAttribute('src');
      img.setAttribute('aria-hidden', 'true');
    }, { once: true });
  });
});


// RIFP.js — diagnóstico y autocorrección de rutas + flip
document.addEventListener('DOMContentLoaded', () => {
  /* ===== Menú móvil ===== */
  const menuBtn = document.getElementById('open');
  const enlaces = document.getElementById('enlaces');
  if (menuBtn && enlaces) {
    menuBtn.addEventListener('click', () => {
      enlaces.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', enlaces.classList.contains('is-open'));
    });
  }

  /* ===== Slider ===== */
  const sliderContainer = document.querySelector('.rifp-gallery-slider');
  if (sliderContainer) {
    const ul = sliderContainer.querySelector('ul');
    const slides = ul ? ul.querySelectorAll('li') : [];
    const prev = sliderContainer.querySelector('.prev');
    const next = sliderContainer.querySelector('.next');
    let i = 0;
    const go = () => { if (ul) ul.style.transform = `translateX(-${i * 100}%)`; };
    if ((slides?.length || 0) > 1) {
      go();
      next?.addEventListener('click', () => { i = (i + 1) % slides.length; go(); });
      prev?.addEventListener('click', () => { i = (i - 1 + slides.length) % slides.length; go(); });
    } else {
      prev && (prev.style.display = 'none');
      next && (next.style.display = 'none');
    }
  }

  /* ===== Flip cards ===== */
  // 0) Estado inicial: ninguna tarjeta volteada
  document.querySelectorAll('.ponente-card.flipped').forEach(c => c.classList.remove('flipped'));

  // 1) Interacción (click y teclado)
  document.querySelectorAll('.ponente-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
    });
  });

  /* ===== Preload + autocorrección de rutas de imágenes ===== */
  const tryPrefixes = ["", "./", "../", "../../"]; // añade más si tu HTML vive más profundo
  const imgs = [...document.querySelectorAll('.ponente-foto')];

  const preload = (imgEl) => new Promise(resolve => {
    const origAttr = imgEl.getAttribute('src') || "";
    // si no hay src, ya marcamos placeholder
    if (!origAttr || /^(data:|https?:)/i.test(origAttr)) {
      resolve({ ok: !!origAttr, used: origAttr });
      return;
    }
    // normaliza: quita ../ de inicio para rearmar
    const clean = origAttr.replace(/^(\.\.\/)+/, "");
    let idx = 0;

    const tryOne = () => {
      const candidate = tryPrefixes[idx] + clean;
      const probe = new Image();
      probe.onload = () => { imgEl.src = candidate; resolve({ ok: true, used: candidate }); };
      probe.onerror = () => {
        idx++;
        if (idx < tryPrefixes.length) tryOne();
        else resolve({ ok: false, used: candidate });
      };
      // bust cache para que el 404 no quede pegado
      probe.src = candidate + (candidate.includes('?') ? '&' : '?') + 'v=' + Date.now();
    };
    tryOne();
  });

  (async () => {
    for (const img of imgs) {
      const r = await preload(img);
      if (!r.ok) {
        // Fallback visual limpio (sin mostrar texto ALT)
        img.classList.add('placeholder');
        img.removeAttribute('src');
        img.setAttribute('aria-hidden', 'true');
        console.warn('[IMG 404]', r.used);
      } else {
        console.log('[IMG OK ]', r.used);
      }
    }
  })();
});


