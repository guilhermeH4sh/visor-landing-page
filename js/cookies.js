import { Store } from './store.js';
import { toast } from './toast.js';

export function initCookies() {
  const banner = document.getElementById('visor-cookie');
  if (!banner) return;

  const consent = Store.getCookiesConsent();
  if (consent) {
    banner.remove();
    return;
  }

  requestAnimationFrame(() => banner.classList.add('is-visible'));

  banner.querySelector('[data-action="accept"]')?.addEventListener('click', () => {
    Store.setCookiesConsent({ essential: true, analytics: true, at: Date.now() });
    banner.classList.remove('is-visible');
    window.setTimeout(() => banner.remove(), 500);
    toast('Preferências de cookies salvas', 'success');
  });

  banner.querySelector('[data-action="essential"]')?.addEventListener('click', () => {
    Store.setCookiesConsent({ essential: true, analytics: false, at: Date.now() });
    banner.classList.remove('is-visible');
    window.setTimeout(() => banner.remove(), 500);
    toast('Apenas cookies essenciais ativados');
  });
}

export function bindWhatsApp() {
  const link = document.getElementById('visor-whatsapp');
  if (!link) return;
  import('./config.js').then(({ CONFIG }) => {
    const text = encodeURIComponent(CONFIG.whatsappMessage);
    link.href = `https://wa.me/${CONFIG.whatsapp}?text=${text}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}
