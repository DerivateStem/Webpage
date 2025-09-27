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
      const open = enlaces.classList.contains('is-open');
      menuBtn.classList.toggle('active', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  /* =======================
     Header sticky (opcional para esta página)
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

      // Navegación por teclado (izquierda/derecha) cuando el slider tiene foco
      sliderContainer.setAttribute('tabindex', '0');
      sliderContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          currentIndex = (currentIndex + 1) % totalSlides;
          updateSlider();
        } else if (e.key === 'ArrowLeft') {
          currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
          updateSlider();
        }
      });

      // Swipe táctil (móvil)
      let startX = 0, isTouch = false;
      sliderContainer.addEventListener('touchstart', (e) => {
        isTouch = true;
        startX = e.touches[0].clientX;
      }, { passive: true });

      sliderContainer.addEventListener('touchend', (e) => {
        if (!isTouch) return;
        const dx = e.changedTouches[0].clientX - startX;
        const threshold = 50; // píxeles para considerar swipe
        if (dx > threshold) {
          currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
          updateSlider();
        } else if (dx < -threshold) {
          currentIndex = (currentIndex + 1) % totalSlides;
          updateSlider();
        }
        isTouch = false;
      });
    }
  }

  /* =======================
     Flip de tarjetas de ponentes
     (Click y teclado: Enter/Espacio)
  ======================= */
  document.querySelectorAll('.ponente-card').forEach((card) => {
    // Click/tap
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    // Accesible por teclado
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });
});
