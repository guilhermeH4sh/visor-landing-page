const stack = document.getElementById('visor-toast-stack');

export function toast(message, type = 'default') {
  if (!stack) return;

  const el = document.createElement('div');
  el.className = `visor-toast${type !== 'default' ? ` visor-toast--${type}` : ''}`;
  el.setAttribute('role', 'status');
  el.textContent = message;
  stack.appendChild(el);

  requestAnimationFrame(() => el.classList.add('is-visible'));

  const hide = () => {
    el.classList.remove('is-visible');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
  };

  window.setTimeout(hide, 3200);
}
