/** Catálogo alinhado aos cards da seção #colecao */
export const PRODUCTS = [
  {
    id: 'vento',
    name: 'Óculos de Sol Vento',
    subtitle: 'Acetato tartaruga · UV400',
    price: 549,
    image: './assets/template/template-02.jpg',
    badge: 'Novo',
    category: 'sol',
  },
  {
    id: 'lume',
    name: 'Armação Clássica Lume',
    subtitle: 'Metal dourado · Grau',
    price: 489,
    image: './assets/template/template-03.jpg',
    category: 'grau',
  },
  {
    id: 'duna',
    name: 'Óculos de Sol Duna',
    subtitle: 'Acetato preto fosco · UV400',
    price: 629,
    image: './assets/template/template-04.jpg',
    badge: 'Best-seller',
    category: 'sol',
  },
  {
    id: 'horizonte',
    name: 'Edição Horizonte',
    subtitle: 'Titânio escovado · Edição limitada',
    price: 699,
    image: './assets/template/template-05.jpg',
    category: 'sol',
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
  };
}
