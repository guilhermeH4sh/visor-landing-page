/**
 * VISOR landing — lightweight UI interactions
 */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const state = {
    cart: [
      { id: "vento", name: "Óculos de Sol Vento", price: 549 },
      { id: "lume", name: "Armação Clássica Lume", price: 489 },
    ],
    favorites: new Set(),
  };

  const toastEl = $("#visor-toast");
  const cartBadge = $("[data-cart-count]");
  const cartPanel = $("#cart-panel");
  const cartList = $("#cart-list");
  const searchPanel = $("#search-panel");
  const mobileMenu = $("#mobile-menu");
  const cookieBanner = $("#cookie-banner");
  const productTrack = $("#product-track");
  const quickView = $("#quick-view");

  function money(n) {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function toast(message, { tone = "default" } = {}) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.dataset.tone = tone;
    toastEl.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toastEl.classList.remove("is-visible"), 2800);
  }

  function syncCart() {
    if (cartBadge) {
      cartBadge.textContent = String(state.cart.length);
      cartBadge.hidden = state.cart.length === 0;
    }
    if (!cartList) return;
    if (state.cart.length === 0) {
      cartList.innerHTML =
        '<p class="font-body-md text-sm text-on-surface-variant">Seu carrinho está vazio.</p>';
      return;
    }
    const total = state.cart.reduce((s, i) => s + i.price, 0);
    cartList.innerHTML =
      state.cart
        .map(
          (item) => `
        <div class="flex justify-between gap-4 border-b border-outline-variant/30 py-3" data-cart-id="${item.id}">
          <div>
            <p class="font-body-md text-sm text-on-surface">${item.name}</p>
            <p class="font-label-caps text-[10px] text-primary mt-1">${money(item.price)}</p>
          </div>
          <button type="button" class="text-on-surface-variant hover:text-primary" data-remove-cart="${item.id}" aria-label="Remover">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>`
        )
        .join("") +
      `<div class="flex justify-between items-center pt-4">
        <span class="font-label-caps text-label-caps">Total</span>
        <span class="font-body-md font-semibold text-primary">${money(total)}</span>
      </div>
      <button type="button" class="mt-4 w-full bg-black text-white px-4 py-3 font-label-caps text-label-caps hover:bg-black/80 transition-colors" data-checkout>
        FINALIZAR COMPRA
      </button>`;
  }

  function openPanel(el) {
    if (!el) return;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
  }

  function closePanel(el) {
    if (!el) return;
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
    if (!$$(".visor-panel.is-open").length) {
      document.body.classList.remove("overflow-hidden");
    }
  }

  function closeAllPanels() {
    $$(".visor-panel.is-open").forEach(closePanel);
  }

  // Cookie banner
  if (cookieBanner) {
    if (localStorage.getItem("visor_cookies") === "1") {
      cookieBanner.hidden = true;
    }
    cookieBanner.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-accept-cookies]");
      if (!btn) return;
      localStorage.setItem("visor_cookies", "1");
      cookieBanner.classList.add("is-hiding");
      setTimeout(() => {
        cookieBanner.hidden = true;
      }, 280);
      toast("Preferências de cookies salvas.");
    });
  }

  // Header actions
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-action]");
    if (!t) return;
    const action = t.dataset.action;

    if (action === "open-cart") {
      e.preventDefault();
      closePanel(searchPanel);
      closePanel(mobileMenu);
      syncCart();
      openPanel(cartPanel);
      return;
    }
    if (action === "open-search") {
      e.preventDefault();
      closePanel(cartPanel);
      openPanel(searchPanel);
      const input = $("#search-input");
      if (input) setTimeout(() => input.focus(), 50);
      return;
    }
    if (action === "open-account") {
      e.preventDefault();
      toast("Área da conta em breve. Enquanto isso, explore a coleção.");
      return;
    }
    if (action === "open-favorites") {
      e.preventDefault();
      const n = state.favorites.size;
      toast(
        n
          ? `Você tem ${n} item${n > 1 ? "s" : ""} nos favoritos.`
          : "Seus favoritos estão vazios. Toque no coração dos produtos."
      );
      return;
    }
    if (action === "toggle-menu") {
      e.preventDefault();
      if (mobileMenu?.classList.contains("is-open")) closePanel(mobileMenu);
      else openPanel(mobileMenu);
      return;
    }
    if (action === "close-panel") {
      e.preventDefault();
      closeAllPanels();
      closePanel(quickView);
      return;
    }
    if (action === "scroll-collection") {
      e.preventDefault();
      $("#destaques")?.scrollIntoView({ behavior: "smooth", block: "start" });
      toast("Explorando os destaques da loja.");
      return;
    }
    if (action === "scroll-top") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (action === "whatsapp") {
      e.preventDefault();
      toast("Abrindo atendimento via WhatsApp…");
      window.open(
        "https://wa.me/5500000000000?text=" +
          encodeURIComponent("Olá! Quero saber mais sobre a coleção VISOR."),
        "_blank",
        "noopener"
      );
      return;
    }
    if (action === "instagram") {
      e.preventDefault();
      toast("Seguindo para @visor.oculos");
      window.open("https://instagram.com/", "_blank", "noopener");
      return;
    }
    if (action === "chat") {
      e.preventDefault();
      toast("Chat online: um consultor VISOR responde em instantes (demo).");
      return;
    }
    if (action === "carousel-prev" || action === "carousel-next") {
      e.preventDefault();
      if (!productTrack) return;
      const delta = action === "carousel-next" ? 340 : -340;
      productTrack.scrollBy({ left: delta, behavior: "smooth" });
      return;
    }
  });

  function checkout() {
    if (!state.cart.length) {
      toast("Adicione um produto antes de finalizar.", { tone: "warn" });
      return;
    }
    toast("Pedido iniciado — checkout demo concluído com sucesso.", {
      tone: "success",
    });
    state.cart = [];
    syncCart();
    closePanel(cartPanel);
  }

  // Cart remove / checkout delegated
  cartPanel?.addEventListener("click", (e) => {
    const remove = e.target.closest("[data-remove-cart]");
    if (remove) {
      const id = remove.dataset.removeCart;
      state.cart = state.cart.filter((i) => i.id !== id);
      syncCart();
      toast("Item removido do carrinho.");
      return;
    }
    if (e.target.closest("[data-checkout]")) {
      e.preventDefault();
      checkout();
    }
  });

  // Product favorite / quick view / add
  $$("[data-product]").forEach((card) => {
    const id = card.dataset.product;
    const name = card.dataset.name;
    const price = Number(card.dataset.price || 0);

    card.querySelector("[data-fav]")?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const btn = e.currentTarget;
      const icon = btn.querySelector(".material-symbols-outlined");
      if (state.favorites.has(id)) {
        state.favorites.delete(id);
        icon?.classList.remove("filled-icon", "text-primary");
        toast(`${name} removido dos favoritos.`);
      } else {
        state.favorites.add(id);
        icon?.classList.add("filled-icon", "text-primary");
        toast(`${name} salvo nos favoritos.`);
      }
    });

    card.querySelector("[data-quick-view]")?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openQuickView({ id, name, price, img: card.querySelector("img")?.src });
    });

    card.addEventListener("click", (e) => {
      if (e.target.closest("button")) return;
      openQuickView({ id, name, price, img: card.querySelector("img")?.src });
    });
  });

  function openQuickView({ id, name, price, img }) {
    if (!quickView) return;
    $("#qv-title", quickView).textContent = name;
    $("#qv-price", quickView).textContent = money(price);
    const imgEl = $("#qv-image", quickView);
    if (imgEl && img) {
      imgEl.src = img;
      imgEl.alt = name;
    }
    const addBtn = $("#qv-add", quickView);
    if (addBtn) {
      addBtn.onclick = () => {
        if (!state.cart.some((i) => i.id === id)) {
          state.cart.push({ id, name, price });
          toast(`${name} adicionado ao carrinho.`, { tone: "success" });
        } else {
          toast(`${name} já está no carrinho.`);
        }
        syncCart();
        closePanel(quickView);
        openPanel(cartPanel);
      };
    }
    openPanel(quickView);
  }

  // Search
  $("#search-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = ($("#search-input")?.value || "").trim();
    if (!q) {
      toast("Digite o que você procura.", { tone: "warn" });
      return;
    }
    closePanel(searchPanel);
    $("#destaques")?.scrollIntoView({ behavior: "smooth" });
    toast(`Buscando “${q}” nos destaques…`);
  });

  // Newsletter
  $("#newsletter-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.querySelector('[name="name"]')?.value?.trim();
    const email = form.querySelector('[name="email"]')?.value?.trim();
    if (!name || !email || !email.includes("@")) {
      toast("Preencha nome e um e-mail válido.", { tone: "warn" });
      return;
    }
    form.reset();
    toast(`Bem-vindo(a), ${name}! Novidades VISOR no seu e-mail.`, {
      tone: "success",
    });
  });

  // Nav category links
  $$("[data-nav-section]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const label = link.textContent.trim();
      closePanel(mobileMenu);
      $("#destaques")?.scrollIntoView({ behavior: "smooth" });
      toast(`Categoria: ${label}`);
    });
  });

  // Escape closes panels
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllPanels();
      closePanel(quickView);
    }
  });

  // Backdrop click
  $$(".visor-panel").forEach((panel) => {
    panel.addEventListener("click", (e) => {
      if (e.target === panel || e.target.classList.contains("visor-backdrop")) {
        closePanel(panel);
      }
    });
  });

  syncCart();
})();
