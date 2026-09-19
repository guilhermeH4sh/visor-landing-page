const images = () =>
  [...document.querySelectorAll('#social img, #social picture img')].filter(Boolean);

let index = 0;

export function openLightbox(startIndex = 0) {
  const list = images();
  if (!list.length) return;
  index = Math.max(0, Math.min(startIndex, list.length - 1));
  const box = document.getElementById('visor-lightbox');
  const img = document.getElementById('visor-lightbox-img');
  const caption = document.getElementById('visor-lightbox-caption');
  if (!box || !img) return;
  img.src = list[index].currentSrc || list[index].src;
  img.alt = list[index].alt || 'Galeria VISOR';
  if (caption) caption.textContent = `${index + 1} / ${list.length}`;
  box.classList.add('is-open');
  box.setAttribute('aria-hidden', 'false');
  document.body.classList.add('visor-panel-open');
}

export function closeLightbox() {
  const box = document.getElementById('visor-lightbox');
  box?.classList.remove('is-open');
  box?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('visor-panel-open');
}

function step(delta) {
  const list = images();
  if (!list.length) return;
  index = (index + delta + list.length) % list.length;
  openLightbox(index);
}

export function initLightbox() {
  const social = document.getElementById('social');
  if (!social) return;

  social.querySelectorAll('img').forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(i);
    });
  });

  document.getElementById('visor-lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('visor-lightbox-prev')?.addEventListener('click', () => step(-1));
  document.getElementById('visor-lightbox-next')?.addEventListener('click', () => step(1));
  document.getElementById('visor-lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'visor-lightbox') closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    const open = document.getElementById('visor-lightbox')?.classList.contains('is-open');
    if (!open) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
}
