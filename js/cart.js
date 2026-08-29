import { CONFIG } from './config.js';
import { Store, formatPrice } from './store.js';
import { findProduct } from './catalog.js';
import { openPanel } from './panels.js';
import { toast } from './toast.js';

const listEl = () => document.getElementById('visor-cart-list');
const subtotalEl = () => document.getElementById('visor-cart-subtotal');
const shippingEl = () => document.getElementById('visor-cart-shipping');
const totalEl = () => document.getElementById('visor-cart-total');
const shippingNote = () => document.getElementById('visor-shipping-note');

export function cartCount() {
  return Store.getCart().reduce((sum, item) => sum + item.qty, 0);
}

export function cartSubtotal() {
  return Store.getCart().reduce((sum, item) => {
    const product = findProduct(item.id);
    return sum + (product?.price || 0) * item.qty;
  }, 0);
}

export function addToCart(productId, qty = 1) {
  const cart = Store.getCart();
  const existing = cart.find((i) => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  Store.setCart(cart);
  const product = findProduct(productId);
  toast(`${product?.name || 'Produto'} adicionado à sacola`, 'success');
  renderCart();
  updateBadge();
}

export function changeQty(productId, delta) {
  const cart = Store.getCart()
    .map((item) =>
      item.id === productId ? { ...item, qty: item.qty + delta } : item,
    )
    .filter((item) => item.qty > 0);
  Store.setCart(cart);
  renderCart();
  updateBadge();
}

export function removeFromCart(productId) {
  Store.setCart(Store.getCart().filter((i) => i.id !== productId));
  renderCart();
  updateBadge();
}

export function updateBadge() {
  const btn = document.querySelector('[aria-label="Sacola"]');
  if (!btn) return;

  btn.classList.add('visor-cart-btn');
  let badge = btn.querySelector('.visor-cart-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'visor-cart-badge';
    badge.setAttribute('aria-hidden', 'true');
    btn.appendChild(badge);
  }

  const count = cartCount();
  badge.textContent = String(count);
  badge.classList.toggle('is-visible', count > 0);
}

export function renderCart() {
  const list = listEl();
  if (!list) return;

  const cart = Store.getCart();
  if (!cart.length) {
    list.innerHTML = '<p class="visor-empty">Sua sacola está vazia.<br>Explore a coleção Horizonte.</p>';
  } else {
    list.innerHTML = cart
      .map((item) => {
        const p = findProduct(item.id);
        if (!p) return '';
        return `
          <div class="visor-line-item" data-id="${p.id}">
            <img src="${p.image}" alt="${p.name}" loading="lazy"/>
            <div>
              <h4>${p.name}</h4>
              <p>${p.subtitle}</p>
              <div class="visor-qty">
                <button type="button" data-action="dec" aria-label="Diminuir quantidade">−</button>
                <span>${item.qty}</span>
                <button type="button" data-action="inc" aria-label="Aumentar quantidade">+</button>
              </div>
            </div>
            <div>
              <strong>${formatPrice(p.price * item.qty)}</strong>
              <button type="button" class="visor-btn visor-btn--link" data-action="remove">Remover</button>
            </div>
          </div>`;
      })
      .join('');
  }

  const subtotal = cartSubtotal();
  const shipping = subtotal >= CONFIG.freeShippingFrom || subtotal === 0 ? 0 : 29.9;
  const total = subtotal + shipping;

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Grátis' : formatPrice(shipping);
  if (totalEl) totalEl.textContent = formatPrice(total);

  const note = shippingNote();
  if (note) {
    if (subtotal === 0) {
      note.textContent = `Frete grátis em compras acima de ${formatPrice(CONFIG.freeShippingFrom)}.`;
      note.classList.remove('is-free');
    } else if (shipping === 0) {
      note.textContent = 'Você ganhou frete grátis neste pedido.';
      note.classList.add('is-free');
    } else {
      const missing = CONFIG.freeShippingFrom - subtotal;
      note.textContent = `Faltam ${formatPrice(missing)} para frete grátis.`;
      note.classList.remove('is-free');
    }
  }
}

export function bindCartPanel() {
  document.getElementById('visor-cart-list')?.addEventListener('click', (e) => {
    const row = e.target.closest('.visor-line-item');
    if (!row) return;
    const id = row.dataset.id;
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'inc') changeQty(id, 1);
    if (action === 'dec') changeQty(id, -1);
    if (action === 'remove') removeFromCart(id);
  });

  document.getElementById('visor-checkout')?.addEventListener('click', () => {
    if (!cartCount()) {
      toast('Adicione itens antes de finalizar', 'error');
      return;
    }
    toast('Checkout demo — em breve integração de pagamento', 'success');
  });

  document.querySelector('[aria-label="Sacola"]')?.addEventListener('click', () => {
    renderCart();
    openPanel('visor-cart');
  });
}

export function initCart() {
  updateBadge();
  renderCart();
  window.addEventListener('visor:cart', () => {
    updateBadge();
    renderCart();
  });
}
