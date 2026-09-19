export function initScrollChrome() {
  const progress = document.getElementById('visor-progress');
  const topBtn = document.getElementById('visor-top');

  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    if (progress) progress.style.width = `${ratio}%`;
    topBtn?.classList.toggle('is-visible', window.scrollY > 480);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  topBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
