import { Store, formatPrice } from './store.js';
import { findProduct } from './catalog.js';
import { openPanel } from './panels.js';
import { toast } from './toast.js';
import { addToCart } from './cart.js';

export function isFavorite(id) {
  return Store.getFavorites().includes(id);
}

export function toggleFavorite(id) {
  const favs = Store.getFavorites();
  const next = favs.includes(id)
    ? favs.filter((f) => f !== id)
    : [...favs, id];
  Store.setFavorites(next);
  const product = findProduct(id);
  toast(
    next.includes(id)
      ? `${product?.name || 'Item'} salvo nos favoritos`
      : `${product?.name || 'Item'} removido dos favoritos`,
  );
  syncFavoriteButtons();
  renderFavorites();
}

export function syncFavoriteButtons() {
  document.querySelectorAll('button[aria-label^="Favoritar"]').forEach((btn) => {
    const name = btn.getAttribute('aria-label')?.replace('Favoritar ', '');
    const product = findProduct(name);
    if (product) {
      btn.classList.toggle('is-favorite', isFavorite(product.id));
    }
  });
}

export function renderFavorites() {
  const list = document.getElementById('visor-favorites-list');
  if (!list) return;

  const ids = Store.getFavorites();
  if (!ids.length) {
    list.innerHTML = '<p class="visor-empty">Nenhum favorito ainda.<br>Toque no coração nos produtos.</p>';
    return;
  }

  list.innerHTML = ids
    .map((id) => findProduct(id))
    .filter(Boolean)
    .map(
      (p) => `
      <div class="visor-line-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" loading="lazy"/>
        <div>
          <h4>${p.name}</h4>
          <p>${p.subtitle}</p>
          <strong>${formatPrice(p.price)}</strong>
        </div>
        <div>
          <button type="button" class="visor-btn visor-btn--ghost" data-action="add">Sacola</button>
          <button type="button" class="visor-btn visor-btn--link" data-action="remove">Remover</button>
        </div>
      </div>`,
    )
    .join('');
}

export function bindFavorites() {
  document.addEventListener('click', (e) => {
    const favBtn = e.target.closest('button[aria-label^="Favoritar"]');
    if (favBtn) {
      e.preventDefault();
      const name = favBtn.getAttribute('aria-label')?.replace('Favoritar ', '');
      const product = findProduct(name);
      if (product) toggleFavorite(product.id);
    }
  });

  document.querySelector('[aria-label="Favoritos"]')?.addEventListener('click', () => {
    renderFavorites();
    openPanel('visor-favorites');
  });

  document.getElementById('visor-favorites-list')?.addEventListener('click', (e) => {
    const row = e.target.closest('.visor-line-item');
    if (!row) return;
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'remove') toggleFavorite(row.dataset.id);
    if (action === 'add') addToCart(row.dataset.id);
  });

  window.addEventListener('visor:favorites', () => {
    syncFavoriteButtons();
    renderFavorites();
  });
}

export function initFavorites() {
  syncFavoriteButtons();
  renderFavorites();
}
