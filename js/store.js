import { STORAGE_KEYS } from './config.js';

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const Store = {
  getCart() {
    return read(STORAGE_KEYS.cart, []);
  },

  setCart(items) {
    write(STORAGE_KEYS.cart, items);
    window.dispatchEvent(new CustomEvent('visor:cart'));
  },

  getFavorites() {
    return read(STORAGE_KEYS.favorites, []);
  },

  setFavorites(ids) {
    write(STORAGE_KEYS.favorites, ids);
    window.dispatchEvent(new CustomEvent('visor:favorites'));
  },

  getCookiesConsent() {
    return read(STORAGE_KEYS.cookies, null);
  },

  setCookiesConsent(value) {
    write(STORAGE_KEYS.cookies, value);
  },

  getNewsletterEmail() {
    return read(STORAGE_KEYS.newsletter, null);
  },

  setNewsletterEmail(email) {
    write(STORAGE_KEYS.newsletter, email);
  },

  getAccount() {
    return read(STORAGE_KEYS.account, null);
  },

  setAccount(account) {
    write(STORAGE_KEYS.account, account);
  },

  getCoupon() {
    return read(STORAGE_KEYS.coupon, null);
  },

  setCoupon(code) {
    write(STORAGE_KEYS.coupon, code);
    window.dispatchEvent(new CustomEvent('visor:coupon'));
  },

  getRecent() {
    return read(STORAGE_KEYS.recent, []);
  },

  setRecent(ids) {
    write(STORAGE_KEYS.recent, ids);
    window.dispatchEvent(new CustomEvent('visor:recent'));
  },

  getCompare() {
    return read(STORAGE_KEYS.compare, []);
  },

  setCompare(ids) {
    write(STORAGE_KEYS.compare, ids);
    window.dispatchEvent(new CustomEvent('visor:compare'));
  },
};

export function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function parsePrice(text) {
  const digits = text.replace(/[^\d,]/g, '').replace(',', '.');
  return Number.parseFloat(digits) || 0;
}
