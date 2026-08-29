const overlay = () => document.getElementById('visor-overlay');

export function openPanel(id) {
  closeAll();
  const panel = document.getElementById(id);
  overlay()?.classList.add('is-open');
  panel?.classList.add('is-open');
  panel?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('visor-panel-open');
  panel?.querySelector('input, button')?.focus();
}

export function closePanel(id) {
  const panel = document.getElementById(id);
  panel?.classList.remove('is-open');
  panel?.setAttribute('aria-hidden', 'true');
  if (!document.querySelector('.visor-panel.is-open, .visor-mobile-nav.is-open, .visor-modal.is-open, .visor-search-bar.is-open')) {
    overlay()?.classList.remove('is-open');
    document.body.classList.remove('visor-panel-open');
  }
}

export function openModal(id) {
  closeAll();
  const modal = document.getElementById(id);
  overlay()?.classList.add('is-open');
  modal?.classList.add('is-open');
  modal?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('visor-panel-open');
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  modal?.classList.remove('is-open');
  modal?.setAttribute('aria-hidden', 'true');
  overlay()?.classList.remove('is-open');
  document.body.classList.remove('visor-panel-open');
}

export function openSearch() {
  closeAll();
  const bar = document.getElementById('visor-search');
  const results = document.getElementById('visor-search-results');
  overlay()?.classList.add('is-open');
  bar?.classList.add('is-open');
  results?.classList.add('is-open');
  document.body.classList.add('visor-panel-open');
  bar?.querySelector('input')?.focus();
}

export function closeSearch() {
  document.getElementById('visor-search')?.classList.remove('is-open');
  document.getElementById('visor-search-results')?.classList.remove('is-open');
  overlay()?.classList.remove('is-open');
  document.body.classList.remove('visor-panel-open');
}

export function openMobileNav() {
  closeAll();
  const nav = document.getElementById('visor-mobile-nav');
  overlay()?.classList.add('is-open');
  nav?.classList.add('is-open');
  nav?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('visor-panel-open');
}

export function closeMobileNav() {
  const nav = document.getElementById('visor-mobile-nav');
  nav?.classList.remove('is-open');
  nav?.setAttribute('aria-hidden', 'true');
  overlay()?.classList.remove('is-open');
  document.body.classList.remove('visor-panel-open');
}

export function closeAll() {
  document.querySelectorAll('.visor-panel.is-open').forEach((el) => {
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
  });
  document.querySelectorAll('.visor-modal.is-open').forEach((el) => {
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
  });
  document.getElementById('visor-mobile-nav')?.classList.remove('is-open');
  document.getElementById('visor-search')?.classList.remove('is-open');
  document.getElementById('visor-search-results')?.classList.remove('is-open');
  overlay()?.classList.remove('is-open');
  document.body.classList.remove('visor-panel-open');
}

export function bindOverlay() {
  overlay()?.addEventListener('click', closeAll);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}
