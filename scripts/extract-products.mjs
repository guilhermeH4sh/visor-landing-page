import { readFileSync } from 'fs';

const html = readFileSync('index.html', 'utf8');
const articles = [...html.matchAll(/<article class="group">([\s\S]*?)<\/article>/g)];
console.log('articles:', articles.length);
for (const [, body] of articles) {
  const name = body.match(/<h3[^>]*>([^<]+)/)?.[1];
  const price = body.match(/R\$\s*[0-9.,]+/)?.[0];
  const img = body.match(/src="([^"]+)"/)?.[1];
  const alt = body.match(/alt="([^"]+)"/)?.[1];
  console.log({ name, price, img, alt });
}

const newsletter = html.includes('newsletter') || html.includes('Inscreva') || html.includes('inscri');
console.log('newsletter keywords', newsletter);
console.log('footer slice:', html.slice(html.indexOf('<footer'), html.indexOf('<footer') + 2000).replace(/></g, '>\n<'));
