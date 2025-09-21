(function () {
    const root = document.querySelector('.events-framed .carousel');
    if (!root) return;

    const viewport = root.querySelector('.carousel__viewport');
    const prev = root.querySelector('.carousel__btn.prev');
    const next = root.querySelector('.carousel__btn.next');
    const dotsWrap = root.querySelector('.carousel__dots');
    const slides = [...root.querySelectorAll('.slide')];

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
        // deshabilita flechas en extremos (más fino)
        prev.style.opacity = i <= 0 ? .4 : .9;
        next.style.opacity = i >= slides.length - 1 ? .4 : .9;
        prev.tabIndex = i <= 0 ? -1 : 0;
        next.tabIndex = i >= slides.length - 1 ? -1 : 0;
    }

    prev.addEventListener('click', () => goTo(idx() - 1));
    next.addEventListener('click', () => goTo(idx() + 1));
    viewport.addEventListener('scroll', () => syncDots());
    window.addEventListener('resize', () => syncDots());
    root.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') goTo(idx() - 1);
        if (e.key === 'ArrowRight') goTo(idx() + 1);
    });

    buildDots();
})();
