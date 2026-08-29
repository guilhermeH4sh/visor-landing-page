import { openMobileNav, closeMobileNav, closeAll } from './panels.js';
import { openPanel } from './panels.js';
import { Store } from './store.js';
import { toast } from './toast.js';

export function bindNav() {
  const header = document.querySelector('header');
  if (header) {
    header.id = 'visor-header';
    window.addEventListener('scroll', () => {
      header.classList.toggle('visor-header-scrolled', window.scrollY > 24);
    }, { passive: true });
  }

  document.querySelector('[aria-label="Abrir menu"]')?.addEventListener('click', openMobileNav);
  document.getElementById('visor-mobile-nav')?.addEventListener('click', (e) => {
    if (e.target.matches('a')) closeMobileNav();
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeAll();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  document.querySelector('[aria-label="Conta"]')?.addEventListener('click', () => {
    renderAccount();
    openPanel('visor-account');
  });
}

function renderAccount() {
  const body = document.getElementById('visor-account-body');
  if (!body) return;

  const account = Store.getAccount();
  if (account) {
    body.innerHTML = `
      <p class="text-sm text-muted-foreground">Olá, <strong>${account.name}</strong></p>
      <p class="text-xs text-muted-foreground mt-2">${account.email}</p>
      <button type="button" class="visor-btn visor-btn--ghost mt-6" id="visor-logout">Sair da conta demo</button>`;
    body.querySelector('#visor-logout')?.addEventListener('click', () => {
      Store.setAccount(null);
      toast('Sessão encerrada');
      renderAccount();
    });
    return;
  }

  body.innerHTML = `
    <p class="text-sm text-muted-foreground mb-4">Acesse sua conta demo para acompanhar pedidos e favoritos sincronizados.</p>
    <form id="visor-login-form">
      <div class="visor-form-field">
        <label for="visor-login-name">Nome</label>
        <input id="visor-login-name" name="name" required placeholder="Seu nome"/>
      </div>
      <div class="visor-form-field">
        <label for="visor-login-email">E-mail</label>
        <input id="visor-login-email" name="email" type="email" required placeholder="voce@email.com"/>
      </div>
      <button type="submit" class="visor-btn visor-btn--primary">Entrar na conta demo</button>
    </form>`;

  body.querySelector('#visor-login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    Store.setAccount({
      name: data.get('name'),
      email: data.get('email'),
    });
    toast(`Bem-vindo, ${data.get('name')}`, 'success');
    renderAccount();
  });
}

export function initReveal() {
  const sections = document.querySelectorAll('#colecao, #atelie, #social, footer');
  sections.forEach((el) => el.classList.add('visor-reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );

  sections.forEach((el) => observer.observe(el));
}

export function bindPromoMarquee() {
  const track = document.querySelector('.animate-marquee, [class*="marquee"]');
  if (track) {
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }
}
