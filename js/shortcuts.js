import { openSearch } from './panels.js';
import { openPanel } from './panels.js';
import { renderCart } from './cart.js';
import { renderFavorites } from './favorites.js';

function isTyping(target) {
  return (
    target instanceof HTMLElement &&
    (target.matches('input, textarea, select') || target.isContentEditable)
  );
}

export function initShortcuts() {
  const hint = document.getElementById('visor-kbd-hint');
  let hintTimer;

  const showHint = (text) => {
    if (!hint) return;
    hint.textContent = text;
    hint.classList.add('is-visible');
    clearTimeout(hintTimer);
    hintTimer = setTimeout(() => hint.classList.remove('is-visible'), 1600);
  };

  document.addEventListener('keydown', (e) => {
    if (isTyping(e.target)) return;

    if (e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) {
      e.preventDefault();
      openSearch();
      showHint('Busca aberta');
      return;
    }

    if (e.key.toLowerCase() === 'b' && !e.metaKey && !e.ctrlKey) {
      renderCart();
      openPanel('visor-cart');
      showHint('Sacola (B)');
      return;
    }

    if (e.key.toLowerCase() === 'f' && !e.metaKey && !e.ctrlKey) {
      renderFavorites();
      openPanel('visor-favorites');
      showHint('Favoritos (F)');
    }
  });
}
