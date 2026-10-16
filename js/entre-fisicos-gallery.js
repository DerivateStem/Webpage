// Progressive enhancement: each photograph is an ordinary image link first.
if (typeof HTMLDialogElement !== 'undefined' && typeof HTMLDialogElement.prototype.showModal === 'function') {
  document.querySelectorAll('[data-ef-gallery]').forEach((gallery, galleryIndex) => {
    const links = [...gallery.querySelectorAll('a[data-ef-photo]')];
    if (!links.length) return;

    const prefix = `ef-viewer-${galleryIndex + 1}`;
    const dialog = document.createElement('dialog');
    dialog.className = 'ef-viewer';
    dialog.setAttribute('aria-labelledby', `${prefix}-title`);
    dialog.setAttribute('aria-describedby', `${prefix}-caption`);
    dialog.innerHTML = `
      <div class="ef-viewer-header">
        <h2 class="ef-viewer-title" id="${prefix}-title"></h2>
        <button class="ef-viewer-button ef-viewer-close" type="button" aria-label="Cerrar fotografías" autofocus>×</button>
      </div>
      <figure>
        <div class="ef-viewer-stage">
          <p class="ef-viewer-loading" hidden>Cargando fotografía…</p>
          <img alt="">
          <p class="ef-viewer-error" hidden>No se pudo cargar esta fotografía. Puedes abrir el archivo con el enlace inferior.</p>
        </div>
        <figcaption class="ef-viewer-caption" id="${prefix}-caption" aria-live="polite" aria-atomic="true"></figcaption>
      </figure>
      <div class="ef-viewer-controls">
        <div class="ef-viewer-pagination">
          <button class="ef-viewer-button" data-ef-previous type="button" aria-label="Fotografía anterior"><span aria-hidden="true">←</span> Anterior</button>
          <span class="ef-viewer-count" aria-live="polite" aria-atomic="true"></span>
          <button class="ef-viewer-button" data-ef-next type="button" aria-label="Fotografía siguiente">Siguiente <span aria-hidden="true">→</span></button>
        </div>
        <a class="ef-viewer-source" target="_blank" rel="noopener noreferrer">Abrir fotografía <span class="sr-only">en otra pestaña</span> ↗</a>
      </div>`;
    dialog.querySelector('.ef-viewer-title').textContent = gallery.dataset.galleryTitle || 'Fotografías de Entre Físicos';
    document.body.append(dialog);

    const image = dialog.querySelector('.ef-viewer-stage img');
    const caption = dialog.querySelector('.ef-viewer-caption');
    const counter = dialog.querySelector('.ef-viewer-count');
    const source = dialog.querySelector('.ef-viewer-source');
    const loading = dialog.querySelector('.ef-viewer-loading');
    const errorMessage = dialog.querySelector('.ef-viewer-error');
    let current = 0;
    let opener;

    function showPhoto(index) {
      current = (index + links.length) % links.length;
      const link = links[current];
      const thumbnail = link.querySelector('img');
      const text = link.dataset.caption || link.closest('figure')?.querySelector('figcaption')?.textContent.trim() || thumbnail?.alt || '';
      dialog.dataset.loading = 'true';
      image.hidden = false;
      loading.hidden = false;
      errorMessage.hidden = true;
      caption.textContent = text;
      caption.hidden = !text;
      counter.textContent = `${current + 1} / ${links.length}`;
      counter.setAttribute('aria-label', `Fotografía ${current + 1} de ${links.length}`);
      source.href = link.href;
      image.alt = thumbnail?.alt || text;
      image.src = link.href;
    }

    image.addEventListener('load', () => {
      dialog.dataset.loading = 'false';
      loading.hidden = true;
    });
    image.addEventListener('error', () => {
      dialog.dataset.loading = 'false';
      loading.hidden = true;
      image.hidden = true;
      errorMessage.hidden = false;
    });

    links.forEach((link, index) => {
      link.setAttribute('aria-haspopup', 'dialog');
      link.addEventListener('click', event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download')) return;
        event.preventDefault();
        opener = link;
        showPhoto(index);
        dialog.showModal();
        document.documentElement.classList.add('ef-viewer-open');
      });
    });

    dialog.querySelector('.ef-viewer-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-ef-previous]').addEventListener('click', () => showPhoto(current - 1));
    dialog.querySelector('[data-ef-next]').addEventListener('click', () => showPhoto(current + 1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
      }
      // Escape uses the native dialog cancellation and focus handling.
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.documentElement.classList.remove('ef-viewer-open');
      image.removeAttribute('src');
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    });
  });
}
