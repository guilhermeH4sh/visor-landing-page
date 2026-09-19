import { CONFIG } from './config.js';
import { Store, formatPrice } from './store.js';
import { findProduct, stockLabel, stars } from './catalog.js';
import { openModal, closeModal } from './panels.js';
import { toast } from './toast.js';
import { addToCart } from './cart.js';

export function toggleCompare(productId) {
  let ids = Store.getCompare();
  if (ids.includes(productId)) {
    ids = ids.filter((id) => id !== productId);
  } else {
    if (ids.length >= CONFIG.compareLimit) {
      toast(`Compare até ${CONFIG.compareLimit} modelos`, 'error');
      return;
    }
    ids = [...ids, productId];
  }
  Store.setCompare(ids);
  syncCompareUI();
}

export function syncCompareUI() {
  const ids = Store.getCompare();
  const bar = document.getElementById('visor-compare-bar');
  if (bar) {
    bar.classList.toggle('is-visible', ids.length > 0);
    const thumbs = bar.querySelector('.visor-compare-bar__thumbs');
    if (thumbs) {
      thumbs.innerHTML = ids
        .map((id) => findProduct(id))
        .filter(Boolean)
        .map((p) => `<img src="${p.image}" alt="${p.name}"/>`)
        .join('');
    }
    const count = bar.querySelector('[data-compare-count]');
    if (count) count.textContent = String(ids.length);
  }

  document.querySelectorAll('.visor-compare-toggle').forEach((btn) => {
    btn.classList.toggle('is-active', ids.includes(btn.dataset.id));
  });
}

export function renderCompareModal() {
  const body = document.getElementById('visor-compare-content');
  if (!body) return;
  const products = Store.getCompare().map(findProduct).filter(Boolean);
  if (!products.length) {
    body.innerHTML = '<p class="visor-empty">Selecione modelos para comparar.</p>';
    return;
  }

  body.innerHTML = `
    <table class="visor-compare-table">
      <thead>
        <tr>
          <th>Modelo</th>
          ${products.map((p) => `<th><img src="${p.image}" alt=""/><div>${p.name}</div></th>`).join('')}
        </tr>
      </thead>
      <tbody>
        <tr><td>Preço</td>${products.map((p) => `<td>${formatPrice(p.price)}</td>`).join('')}</tr>
        <tr><td>Categoria</td>${products.map((p) => `<td>${p.category === 'grau' ? 'Grau' : 'Sol'}</td>`).join('')}</tr>
        <tr><td>Avaliação</td>${products.map((p) => `<td>${stars(p.rating)} ${p.rating}</td>`).join('')}</tr>
        <tr><td>Estoque</td>${products.map((p) => `<td>${stockLabel(p.stock).text}</td>`).join('')}</tr>
        <tr><td>Detalhes</td>${products.map((p) => `<td>${p.subtitle}</td>`).join('')}</tr>
        <tr><td></td>${products
          .map(
            (p) =>
              `<td><button type="button" class="visor-btn visor-btn--primary" data-add="${p.id}" style="width:auto">Sacola</button></td>`,
          )
          .join('')}</tr>
      </tbody>
    </table>`;

  body.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => addToCart(btn.dataset.add));
  });
}

export function initCompare() {
  document.querySelectorAll('#colecao article').forEach((article) => {
    if (article.querySelector('.visor-compare-toggle')) return;
    const media = article.querySelector('.relative');
    const product = findProduct(article.querySelector('h3')?.textContent?.trim());
    if (!media || !product) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'visor-compare-toggle';
    btn.dataset.id = product.id;
    btn.textContent = 'Comparar';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleCompare(product.id);
    });
    media.appendChild(btn);
  });

  document.getElementById('visor-compare-open')?.addEventListener('click', () => {
    renderCompareModal();
    openModal('visor-compare');
  });

  document.getElementById('visor-compare-clear')?.addEventListener('click', () => {
    Store.setCompare([]);
    syncCompareUI();
  });

  document.getElementById('visor-compare-close')?.addEventListener('click', () => {
    closeModal('visor-compare');
  });

  window.addEventListener('visor:compare', syncCompareUI);
  syncCompareUI();
}
