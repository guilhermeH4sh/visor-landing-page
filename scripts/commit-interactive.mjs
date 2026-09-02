#!/usr/bin/env node
/** Cria 11 commits técnicos incrementais da camada interativa */
import { execSync } from 'child_process';

const commits = [
  {
    files: ['css/app.css'],
    message: 'feat(ui): adicionar camada CSS de overlays, painéis e animações',
  },
  {
    files: ['js/config.js', 'js/store.js'],
    message: 'feat(store): persistência local para carrinho, favoritos e preferências',
  },
  {
    files: ['js/catalog.js'],
    message: 'feat(catalog): estruturar catálogo de produtos da coleção Horizonte',
  },
  {
    files: ['js/toast.js', 'js/panels.js'],
    message: 'feat(ui): utilitários de toast e gerenciamento de painéis modais',
  },
  {
    files: ['js/cart.js'],
    message: 'feat(cart): drawer de sacola com frete grátis e checkout demo',
  },
  {
    files: ['js/search.js'],
    message: 'feat(search): busca ao vivo com suporte a query string ?q=',
  },
  {
    files: ['js/favorites.js', 'js/quickview.js'],
    message: 'feat(produto): favoritos sincronizados e modal de visualização rápida',
  },
  {
    files: ['js/nav.js'],
    message: 'feat(nav): menu mobile, scroll suave e header responsivo ao scroll',
  },
  {
    files: ['js/newsletter.js', 'js/cookies.js'],
    message: 'feat(compliance): newsletter com validação e banner de cookies LGPD',
  },
  {
    files: ['partials/app-shell.html', 'js/app.js'],
    message: 'feat(app): shell HTML interativo e bootstrap modular da aplicação',
  },
  {
    files: ['index.html', 'README.md', 'template-manifest.json', 'scripts/inject-app.mjs'],
    message: 'feat(integration): integrar camada dinâmica ao index e documentar interatividade',
  },
];

for (const { files, message } of commits) {
  for (const f of files) {
    execSync(`git add "${f}"`, { stdio: 'inherit' });
  }
  execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
}

console.log('11 commits criados com sucesso.');
