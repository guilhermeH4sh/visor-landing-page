import { formatPrice } from './store.js';
import { findProduct } from './catalog.js';
import { openModal, closeModal } from './panels.js';
import { addToCart } from './cart.js';
import { toggleFavorite, isFavorite } from './favorites.js';

const content = () => document.getElementById('visor-quickview-content');

export function openQuickView(product) {
  const el = content();
  if (!el || !product) return;

  el.innerHTML = `
    <div class="visor-quickview">
      <img src="${product.image}" alt="${product.name}" loading="lazy"/>
      <div>
        ${product.badge ? `<span class="eyebrow text-primary">${product.badge}</span>` : ''}
        <h3>${product.name}</h3>
        <p class="text-sm text-muted-foreground">${product.subtitle}</p>
        <p class="visor-price">${formatPrice(product.price)}</p>
        <p class="text-xs text-muted-foreground mt-2">6x sem juros · Estojo em couro vegetal incluso</p>
        <div style="display:flex;gap:0.5rem;margin-top:1.5rem;flex-wrap:wrap">
          <button type="button" class="visor-btn visor-btn--primary" id="visor-qv-add">Adicionar à sacola</button>
          <button type="button" class="visor-btn visor-btn--ghost" id="visor-qv-fav">${isFavorite(product.id) ? 'Remover favorito' : 'Favoritar'}</button>
        </div>
      </div>
    </div>`;

  el.querySelector('#visor-qv-add')?.addEventListener('click', () => {
    addToCart(product.id);
    closeModal('visor-quickview');
  });

  el.querySelector('#visor-qv-fav')?.addEventListener('click', (e) => {
    toggleFavorite(product.id);
    e.target.textContent = isFavorite(product.id) ? 'Remover favorito' : 'Favoritar';
  });

  openModal('visor-quickview');
}

export function bindQuickView() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button[aria-label^="Visualizar"]');
    if (!btn) return;
    e.preventDefault();
    const name = btn.getAttribute('aria-label')?.replace('Visualizar ', '');
    const product = findProduct(name);
    if (product) openQuickView(product);
  });

  document.getElementById('visor-quickview-close')?.addEventListener('click', () => {
    closeModal('visor-quickview');
  });
}
