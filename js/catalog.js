/** Catálogo enriquecido — estoque, ratings, variantes */
export const PRODUCTS = [
  {
    id: 'vento',
    name: 'Óculos de Sol Vento',
    subtitle: 'Acetato tartaruga · UV400',
    price: 549,
    image: './assets/template/template-02.jpg',
    badge: 'Novo',
    category: 'sol',
    stock: 12,
    rating: 4.8,
    reviews: 36,
    colors: [
      { id: 'tartaruga', label: 'Tartaruga', hex: '#8B5E3C' },
      { id: 'preto', label: 'Preto', hex: '#1a1612' },
    ],
    sizes: ['Único'],
  },
  {
    id: 'lume',
    name: 'Armação Clássica Lume',
    subtitle: 'Metal dourado · Grau',
    price: 489,
    image: './assets/template/template-03.jpg',
    category: 'grau',
    stock: 4,
    rating: 4.6,
    reviews: 22,
    colors: [
      { id: 'dourado', label: 'Dourado', hex: '#C9A227' },
      { id: 'prata', label: 'Prata', hex: '#A8A9AD' },
    ],
    sizes: ['48', '50', '52'],
  },
  {
    id: 'duna',
    name: 'Óculos de Sol Duna',
    subtitle: 'Acetato preto fosco · UV400',
    price: 629,
    image: './assets/template/template-04.jpg',
    badge: 'Best-seller',
    category: 'sol',
    stock: 7,
    rating: 4.9,
    reviews: 58,
    colors: [
      { id: 'fosco', label: 'Preto fosco', hex: '#2a2a2a' },
      { id: 'havana', label: 'Havana', hex: '#6B3E26' },
    ],
    sizes: ['Único'],
  },
  {
    id: 'horizonte',
    name: 'Edição Horizonte',
    subtitle: 'Titânio escovado · Edição limitada',
    price: 699,
    image: './assets/template/template-05.jpg',
    category: 'sol',
    stock: 2,
    rating: 5,
    reviews: 14,
    colors: [
      { id: 'titanio', label: 'Titânio', hex: '#6E7275' },
    ],
    sizes: ['Único'],
  },
];

export function findProduct(idOrName) {
  return PRODUCTS.find(
    (p) => p.id === idOrName || p.name === idOrName,
  );
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.category.includes(q),
  );
}

export function filterByCategory(category) {
  if (!category || category === 'todos') return [...PRODUCTS];
  return PRODUCTS.filter((p) => p.category === category);
}

export function sortProducts(list, mode) {
  const items = [...list];
  if (mode === 'price-asc') items.sort((a, b) => a.price - b.price);
  if (mode === 'price-desc') items.sort((a, b) => b.price - a.price);
  if (mode === 'rating') items.sort((a, b) => b.rating - a.rating);
  if (mode === 'name') items.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  return items;
}

export function stockLabel(stock) {
  if (stock <= 0) return { text: 'Esgotado', tone: 'out' };
  if (stock <= 3) return { text: `Últimas ${stock} unidades`, tone: 'low' };
  return { text: 'Em estoque', tone: 'ok' };
}

export function stars(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

export function productFromArticle(article) {
  const name = article.querySelector('h3')?.textContent?.trim();
  const fromCatalog = findProduct(name);
  if (fromCatalog) return fromCatalog;

  const priceText = article.querySelector('.text-primary')?.textContent || '';
  const price = Number.parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  return {
    id: name?.toLowerCase().replace(/\s+/g, '-') || 'produto',
    name: name || 'Produto',
    subtitle: article.querySelector('.text-muted-foreground')?.textContent?.trim() || '',
    price,
    image: article.querySelector('img')?.getAttribute('src') || '',
    stock: 10,
    rating: 4.5,
    reviews: 0,
    colors: [],
    sizes: ['Único'],
    category: 'sol',
  };
}
