(function () {
    // Busca TODOS los carruseles que hay en la página
    const carousels = document.querySelectorAll('.carousel');

    // Si no encuentra ninguno, se detiene
    if (!carousels.length) return;

    // Recorre cada carrusel encontrado (primero Eventos, luego Novedades)
    //    y le aplica la misma lógica a CADA UNO por separado.
    carousels.forEach(root => {
        
        const viewport = root.querySelector('.carousel__viewport');
        const prev = root.querySelector('.carousel__btn.prev');
        const next = root.querySelector('.carousel__btn.next');
        const dotsWrap = root.querySelector('.carousel__dots');
        const slides = [...root.querySelectorAll('.slide')];

        // Si a un carrusel le falta una pieza clave, lo ignora y sigue
        if (!viewport || !prev || !next || !dotsWrap || !slides.length) {
            return;
        }

        const slideW = () => viewport.clientWidth;
        const idx = () => Math.round(viewport.scrollLeft / slideW());

        function goTo(i) {
            i = Math.max(0, Math.min(slides.length - 1, i));
            viewport.scrollTo({ left: i * slideW(), behavior: 'smooth' });
            syncDots(i);
        }

        function buildDots() {
            dotsWrap.innerHTML = '';
            slides.forEach((_, i) => {
                const b = document.createElement('button');
                b.type = 'button';
                b.setAttribute('aria-label', 'Ir al slide ' + (i + 1));
                b.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(b);
            });
            syncDots(idx());
        }

        function syncDots(i = idx()) {
            [...dotsWrap.children].forEach((d, k) => d.setAttribute('aria-current', String(k === i)));
            // deshabilita flechas en extremos
            prev.style.opacity = i <= 0 ? .4 : .9;
            next.style.opacity = i >= slides.length - 1 ? .4 : .9;
            prev.tabIndex = i <= 0 ? -1 : 0;
            next.tabIndex = i >= slides.length - 1 ? -1 : 0;
        }

        prev.addEventListener('click', () => goTo(idx() - 1));
        next.addEventListener('click', () => goTo(idx() + 1));
        viewport.addEventListener('scroll', () => syncDots());
        window.addEventListener('resize', () => syncDots()); // Se re-sincronizan ambos
        root.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') goTo(idx() - 1);
            if (e.key === 'ArrowRight') goTo(idx() + 1);
        });

        buildDots();

    }); // <-- Fin del bucle forEach

})();
