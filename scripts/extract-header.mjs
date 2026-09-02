import { readFileSync } from 'fs';
const html = readFileSync('index.html', 'utf8');
const headerIdx = html.indexOf('<header');
console.log(html.slice(headerIdx, headerIdx + 3500).replace(/></g, '>\n<'));
