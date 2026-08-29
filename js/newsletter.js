import { Store } from './store.js';
import { toast } from './toast.js';

export function bindNewsletter() {
  const form = document.querySelector('footer form');
  if (!form) return;

  const saved = Store.getNewsletterEmail();
  if (saved) {
    const input = form.querySelector('input[type="email"]');
    if (input) {
      input.value = saved;
      input.disabled = true;
    }
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const email = input?.value?.trim();
    if (!email || !input.checkValidity()) {
      toast('Informe um e-mail válido', 'error');
      return;
    }
    Store.setNewsletterEmail(email);
    input.disabled = true;
    form.querySelector('button[type="submit"]').disabled = true;
    toast('Inscrição confirmada — bem-vindo à lista VISOR', 'success');
  });
}
