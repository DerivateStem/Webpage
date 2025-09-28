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


