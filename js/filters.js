import { findProduct, productFromArticle } from './catalog.js';

let category = 'todos';
let sortMode = 'featured';

function articles() {
  return [...document.querySelectorAll('#colecao article.group')];
}

function apply() {
  const items = articles().map((article, index) => ({
    article,
    product: productFromArticle(article),
    index,
  }));

  let visible = items.filter(({ product }) => {
    if (category === 'todos') return true;
    return product.category === category;
  });

  if (sortMode === 'price-asc') {
    visible.sort((a, b) => a.product.price - b.product.price);
  } else if (sortMode === 'price-desc') {
    visible.sort((a, b) => b.product.price - a.product.price);
  } else if (sortMode === 'rating') {
    visible.sort((a, b) => (b.product.rating || 0) - (a.product.rating || 0));
  } else {
    visible.sort((a, b) => a.index - b.index);
  }

  const grid = document.querySelector('#colecao .grid');
  items.forEach(({ article }) => {
    article.classList.add('visor-hidden');
  });

  visible.forEach(({ article }) => {
    article.classList.remove('visor-hidden');
    if (grid) grid.appendChild(article);
  });

  document.querySelectorAll('.visor-chip[data-filter]').forEach((chip) => {
    chip.classList.toggle('is-active', chip.dataset.filter === category);
  });

  const empty = document.getElementById('visor-filter-empty');
  if (empty) empty.hidden = visible.length > 0;
}

export function initFilters() {
  const colecao = document.getElementById('colecao');
  if (!colecao || document.getElementById('visor-filters')) return;

  const bar = document.createElement('div');
  bar.id = 'visor-filters';
  bar.className = 'visor-filters';
  bar.setAttribute('role', 'toolbar');
  bar.setAttribute('aria-label', 'Filtrar coleção');
  bar.innerHTML = `
    <span class="visor-filters__label">Filtrar</span>
    <button type="button" class="visor-chip is-active" data-filter="todos">Todos</button>
    <button type="button" class="visor-chip" data-filter="sol">Óculos de Sol</button>
    <button type="button" class="visor-chip" data-filter="grau">Grau</button>
    <label class="sr-only" for="visor-sort">Ordenar</label>
    <select id="visor-sort" aria-label="Ordenar produtos">
      <option value="featured">Destaques</option>
      <option value="price-asc">Menor preço</option>
      <option value="price-desc">Maior preço</option>
      <option value="rating">Melhor avaliados</option>
    </select>
    <p id="visor-filter-empty" class="visor-empty" hidden style="width:100%;margin:0">Nenhum modelo nesta categoria.</p>
  `;

  const headingBlock = colecao.querySelector('.mb-12');
  if (headingBlock) headingBlock.after(bar);
  else colecao.prepend(bar);

  bar.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-filter]');
    if (!chip) return;
    category = chip.dataset.filter;
    apply();
  });

  bar.querySelector('#visor-sort')?.addEventListener('change', (e) => {
    sortMode = e.target.value;
    apply();
  });

  // Navegação do header "Óculos de Sol" / "Grau"
  document.querySelectorAll('a[href="#colecao"]').forEach((link) => {
    link.addEventListener('click', () => {
      const text = link.textContent.trim().toLowerCase();
      if (text.includes('sol')) category = 'sol';
      else if (text.includes('grau')) category = 'grau';
      else category = 'todos';
      apply();
    });
  });
}

export function enrichProductCards() {
  articles().forEach((article) => {
    const product = productFromArticle(article);
    if (!product || article.querySelector('.visor-rating')) return;

    const meta = article.querySelector('.mt-2');
    if (!meta) return;

    const rating = document.createElement('div');
    rating.className = 'visor-rating';
    rating.innerHTML = `<span class="visor-rating__stars" aria-hidden="true">${'★'.repeat(Math.round(product.rating || 0))}${'☆'.repeat(5 - Math.round(product.rating || 0))}</span><span>${(product.rating || 0).toFixed(1)} (${product.reviews || 0})</span>`;
    meta.after(rating);

    const stock = document.createElement('div');
    const level = product.stock <= 0 ? 'out' : product.stock <= 3 ? 'low' : 'ok';
    const text =
      product.stock <= 0
        ? 'Esgotado'
        : product.stock <= 3
          ? `Últimas ${product.stock} unidades`
          : 'Em estoque';
    stock.className = `visor-stock visor-stock--${level}`;
    stock.textContent = text;
    rating.after(stock);

    article.dataset.productId = product.id;
    article.dataset.category = product.category || 'sol';
  });
}

export { findProduct };
