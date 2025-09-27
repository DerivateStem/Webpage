document.addEventListener('DOMContentLoaded', () => {
  /* =======================
     Menú móvil
     ======================= */
  const menuBtn = document.getElementById('open');
  const enlaces = document.getElementById('enlaces');
  if (menuBtn && enlaces) {
    menuBtn.addEventListener('click', () => {
      enlaces.classList.toggle('is-open');
      const open = enlaces.classList.contains('is-open');
      menuBtn.classList.toggle('active', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  /* =======================
     Header sticky (opcional)
     Solo si usas sticky en esta página
     ======================= */
  const header = document.querySelector('header');
  if (header && document.body.classList.contains('rifp-page')) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('sticky', window.scrollY > 20);
    });
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
      if (prevButton) prevButton.style.display = 'none';
      if (nextButton) nextButton.style.display = 'none';
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

      // (Opcional) Swipe táctil simple
      let startX = 0;
      let isTouch = false;

      sliderContainer.addEventListener('touchstart', (e) => {
        isTouch = true;
        startX = e.touches[0].clientX;
      }, { passive: true });

      sliderContainer.addEventListener('touchmove', (e) => {
        if (!isTouch) return;
        const dx = e.touches[0].clientX - startX;
        // No hacemos drag visual para mantenerlo simple
      }, { passive: true });

      sliderContainer.addEventListener('touchend', (e) => {
        if (!isTouch) return;
        const endX = e.changedTouches[0].clientX;
        const dx = endX - startX;
        const threshold = 50; // px
        if (dx > threshold) {
          // swipe right -> prev
          currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
          updateSlider();
        } else if (dx < -threshold) {
          // swipe left -> next
          currentIndex = (currentIndex + 1) % totalSlides;
          updateSlider();
        }
        isTouch = false;
      });
    }
  }

  /* =======================
     Flip de tarjetas ponentes
     ======================= */
  document.querySelectorAll('.ponente-card').forEach((card) => {
    // Click
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    // Teclado (accesible): Enter o Espacio
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });
});
