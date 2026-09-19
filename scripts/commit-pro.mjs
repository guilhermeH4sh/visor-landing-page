#!/usr/bin/env node
import { execSync } from 'child_process';

const commits = [
  {
    files: ['css/pro.css'],
    message: 'feat(ui): adicionar CSS profissional v2 com filtros, lightbox e chrome',
  },
  {
    files: ['js/catalog.js', 'js/config.js', 'js/store.js'],
    message: 'feat(catalog): enriquecer produtos com estoque, ratings e cupons',
  },
  {
    files: ['js/filters.js'],
    message: 'feat(colecao): filtros por categoria, ordenacao e badges de estoque',
  },
  {
    files: ['js/coupon.js', 'js/cart.js'],
    message: 'feat(cart): cupons de desconto e frete gratis na sacola',
  },
  {
    files: ['js/recent.js'],
    message: 'feat(produto): historico de itens vistos recentemente',
  },
  {
    files: ['js/compare.js'],
    message: 'feat(produto): barra e modal de comparacao entre modelos',
  },
  {
    files: ['js/lightbox.js'],
    message: 'feat(social): lightbox interativo da galeria Instagram',
  },
  {
    files: ['js/scroll.js', 'js/shortcuts.js'],
    message: 'feat(ux): barra de progresso, voltar ao topo e atalhos de teclado',
  },
  {
    files: ['js/quickview.js'],
    message: 'feat(produto): variantes de cor/tamanho e avaliacoes no quick view',
  },
  {
    files: ['partials/app-shell.html', 'js/app.js'],
    message: 'feat(app): integrar shell v2 e bootstrap dos novos modulos',
  },
  {
    files: [
      'index.html',
      'README.md',
      'template-manifest.json',
      'scripts/inject-app.mjs',
      'scripts/commit-pro.mjs',
    ],
    message: 'feat(integration): publicar camada profissional v2 no index e docs',
  },
];

for (const { files, message } of commits) {
  for (const f of files) {
    try {
      execSync(`git add -- "${f}"`, { stdio: 'inherit' });
    } catch {
      console.warn('skip missing', f);
    }
  }
  execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
}

console.log('11 commits profissionais criados.');
