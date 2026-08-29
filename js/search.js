import { searchProducts, findProduct } from './catalog.js';
import { formatPrice } from './store.js';
import { openSearch, closeSearch } from './panels.js';
import { openQuickView } from './quickview.js';

const input = () => document.getElementById('visor-search-input');
const resultsEl = () => document.getElementById('visor-search-results');

function renderResults(items) {
  const el = resultsEl();
  if (!el) return;

  if (!items.length) {
    el.innerHTML = '<p class="visor-empty">Nenhum modelo encontrado.</p>';
    return;
  }

  el.innerHTML = items
    .map(
      (p) => `
      <button type="button" class="visor-search-item" data-id="${p.id}">
        <img src="${p.image}" alt="" loading="lazy"/>
        <div>
          <strong>${p.name}</strong>
          <span>${p.subtitle}</span>
        </div>
        <em>${formatPrice(p.price)}</em>
      </button>`,
    )
    .join('');
}

export function runSearch(query) {
  renderResults(searchProducts(query));
}

export function bindSearch() {
  document.querySelector('[aria-label="Buscar"]')?.addEventListener('click', () => {
    openSearch();
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    const field = input();
    if (field) {
      field.value = q;
      if (q) runSearch(q);
    }
  });

  input()?.addEventListener('input', (e) => {
    runSearch(e.target.value);
  });

  resultsEl()?.addEventListener('click', (e) => {
    const btn = e.target.closest('.visor-search-item');
    if (!btn) return;
    const product = findProduct(btn.dataset.id);
    closeSearch();
    if (product) openQuickView(product);
  });

  document.getElementById('visor-search-close')?.addEventListener('click', closeSearch);

  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) {
    openSearch();
    if (input()) input().value = q;
    runSearch(q);
  }
}
