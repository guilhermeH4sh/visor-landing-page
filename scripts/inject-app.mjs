import { readFileSync, writeFileSync } from 'fs';

const htmlPath = 'index.html';
const shellPath = 'partials/app-shell.html';

let html = readFileSync(htmlPath, 'utf8');
const shell = readFileSync(shellPath, 'utf8');

if (!html.includes('css/app.css')) {
  html = html.replace('</head>', '<link rel="stylesheet" href="css/app.css"/></head>');
}

if (!html.includes('js/app.js')) {
  const injection = `${shell}\n<script type="module" src="js/app.js"></script>`;
  html = html.replace('</body>', `${injection}</body>`);
}

writeFileSync(htmlPath, html);
console.log('index.html atualizado com camada interativa VISOR');
