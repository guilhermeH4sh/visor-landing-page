import { CONFIG } from './config.js';
import { Store, formatPrice } from './store.js';
import { toast } from './toast.js';

export function resolveCoupon(code) {
  if (!code) return null;
  return CONFIG.coupons[code.trim().toUpperCase()] || null;
}

export function discountAmount(subtotal, couponCode) {
  const coupon = resolveCoupon(couponCode);
  if (!coupon) return 0;
  if (coupon.type === 'percent') return (subtotal * coupon.value) / 100;
  if (coupon.type === 'fixed') return Math.min(coupon.value, subtotal);
  return 0;
}

export function applyCoupon(code) {
  const coupon = resolveCoupon(code);
  if (!coupon) {
    toast('Cupom inválido ou expirado', 'error');
    return false;
  }
  Store.setCoupon(code.trim().toUpperCase());
  toast(`Cupom ${coupon.label} aplicado`, 'success');
  return true;
}

export function clearCoupon() {
  Store.setCoupon(null);
  toast('Cupom removido');
}

export function bindCoupon() {
  const form = document.getElementById('visor-coupon-form');
  if (!form) return;

  const input = form.querySelector('input');
  const saved = Store.getCoupon();
  if (saved && input) input.value = saved;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    applyCoupon(input?.value || '');
  });

  document.getElementById('visor-coupon-clear')?.addEventListener('click', () => {
    if (input) input.value = '';
    clearCoupon();
  });
}

export function formatDiscountLine(subtotal) {
  const code = Store.getCoupon();
  const amount = discountAmount(subtotal, code);
  if (!amount) return null;
  return { code, amount, label: `− ${formatPrice(amount)}` };
}
