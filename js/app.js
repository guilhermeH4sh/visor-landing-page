import { bindOverlay, closePanel } from './panels.js';
import { initCart, bindCartPanel, addToCart } from './cart.js';
import { bindSearch } from './search.js';
import { bindFavorites, initFavorites } from './favorites.js';
import { bindQuickView } from './quickview.js';
import { bindNav, initReveal, bindPromoMarquee } from './nav.js';
import { bindNewsletter } from './newsletter.js';
import { initCookies, bindWhatsApp } from './cookies.js';
import { findProduct, productFromArticle } from './catalog.js';

function bindPanelCloseButtons() {
  document.querySelectorAll('[data-close]').forEach((btn) => {
    btn.addEventListener('click', () => closePanel(btn.dataset.close));
  });
}

function bindAddToCartButtons() {
  document.querySelectorAll('#colecao article').forEach((article) => {
    const btn = [...article.querySelectorAll('button')].find(
      (b) => b.textContent.trim() === 'Adicionar à sacola',
    );
    if (!btn) return;
    btn.addEventListener('click', () => {
      const product = productFromArticle(article);
      const catalog = findProduct(product.id) || findProduct(product.name);
      addToCart(catalog?.id || product.id);
    });
  });
}

function init() {
  bindOverlay();
  bindPanelCloseButtons();
  bindNav();
  bindPromoMarquee();
  initReveal();
  initCart();
  bindCartPanel();
  bindSearch();
  initFavorites();
  bindFavorites();
  bindQuickView();
  bindAddToCartButtons();
  bindNewsletter();
  initCookies();
  bindWhatsApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
