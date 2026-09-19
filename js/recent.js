import { CONFIG } from './config.js';
import { Store, formatPrice } from './store.js';
import { findProduct } from './catalog.js';

export function trackRecent(productId) {
  if (!productId) return;
  const next = [productId, ...Store.getRecent().filter((id) => id !== productId)].slice(
    0,
    CONFIG.recentLimit,
  );
  Store.setRecent(next);
}

export function renderRecent() {
  const host = document.getElementById('visor-recent');
  if (!host) return;

  const ids = Store.getRecent();
  if (!ids.length) {
    host.hidden = true;
    return;
  }

  host.hidden = false;
  const grid = host.querySelector('.visor-recent__grid');
  if (!grid) return;

  grid.innerHTML = ids
    .map((id) => findProduct(id))
    .filter(Boolean)
    .map(
      (p) => `
      <button type="button" class="visor-recent__card" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" loading="lazy"/>
        <strong>${p.name}</strong>
        <span>${formatPrice(p.price)}</span>
      </button>`,
    )
    .join('');
}

export function initRecent() {
  let host = document.getElementById('visor-recent');
  if (!host) {
    const colecao = document.getElementById('colecao');
    if (!colecao) return;
    host = document.createElement('section');
    host.id = 'visor-recent';
    host.className = 'visor-recent';
    host.hidden = true;
    host.innerHTML = `
      <h3>Vistos recentemente</h3>
      <div class="visor-recent__grid"></div>`;
    colecao.appendChild(host);
  }

  host.addEventListener('click', async (e) => {
    const card = e.target.closest('.visor-recent__card');
    if (!card) return;
    const product = findProduct(card.dataset.id);
    if (!product) return;
    const { openQuickView } = await import('./quickview.js');
    openQuickView(product);
  });

  window.addEventListener('visor:recent', renderRecent);
  renderRecent();
}
