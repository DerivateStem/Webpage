document.addEventListener('DOMContentLoaded', function () {
    
    // --- Lógica General (antes en script.js) ---

    // Menú de navegación móvil
    const menuBtn = document.querySelector('.menu-btn');
    const navbar = document.querySelector('.navbar');
    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }

    // Header pegajoso (sticky)
    const header = document.querySelector('header');
    if (header) {
        // La página RIFP tiene un header diferente, así que esta lógica
        // podría no ser necesaria aquí, pero la incluimos por si acaso.
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // --- Lógica Específica de RIFP (Galería) ---

    const sliderContainer = document.querySelector('.rifp-gallery-slider');
    if (!sliderContainer) {
        return; // Si no se encuentra el slider, no continuamos con esta parte.
    }

    const slider = sliderContainer.querySelector('ul');
    const slides = slider.querySelectorAll('li');
    const prevButton = sliderContainer.querySelector('.prev');
    const nextButton = sliderContainer.querySelector('.next');

    let currentIndex = 0;
    const totalSlides = slides.length;

    if (totalSlides <= 1) {
        if(prevButton) prevButton.style.display = 'none';
        if(nextButton) nextButton.style.display = 'none';
        return;
    }

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    document.querySelectorAll('.ponente-card').forEach(card => {
        card.addEventListener('click', function() {
            card.classList.toggle('flipped');
        });
    });

});
