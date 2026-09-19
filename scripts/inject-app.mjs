import { readFileSync, writeFileSync } from 'fs';

const htmlPath = 'index.html';
const shell = readFileSync('partials/app-shell.html', 'utf8');
let html = readFileSync(htmlPath, 'utf8');

if (!html.includes('css/app.css')) {
  html = html.replace('</head>', '<link rel="stylesheet" href="css/app.css"/></head>');
}
if (!html.includes('css/pro.css')) {
  html = html.replace('</head>', '<link rel="stylesheet" href="css/pro.css"/></head>');
}

const scriptTag = '<script type="module" src="js/app.js"></script>';
const rootIdx = html.indexOf('id="visor-app-root"');
const scriptIdx = html.indexOf(scriptTag);

if (rootIdx !== -1 && scriptIdx !== -1) {
  const start = html.lastIndexOf('<div', rootIdx);
  html = `${html.slice(0, start)}${shell}\n${scriptTag}${html.slice(scriptIdx + scriptTag.length)}`;
} else if (scriptIdx !== -1) {
  html = html.replace(scriptTag, `${shell}\n${scriptTag}`);
} else {
  html = html.replace('</body>', `${shell}\n${scriptTag}</body>`);
}

writeFileSync(htmlPath, html);
console.log('index.html atualizado (shell + pro.css)');
