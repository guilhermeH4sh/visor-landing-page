# VISOR Landing Page

Landing editorial da marca **VISOR** (óculos premium).

## Stack

- HTML estático de alta fidelidade
- Tailwind CSS v4 (embutido)
- Camada interativa em ES modules (`js/`, `css/app.css`, `css/pro.css`)
- Tipografia: Playfair Display + Hanken Grotesk
- Imagens em `assets/template/`

## Interatividade

- Sacola com persistência local, frete grátis acima de R$ 399 e checkout demo
- Cupons demo: `VISOR10`, `HORIZONTE50`, `FRETEGRATIS`
- Filtros e ordenação na coleção (Sol / Grau)
- Busca ao vivo (`?q=` / atalho `/`), visualização rápida com variantes
- Favoritos, comparação de modelos e vistos recentemente
- Avaliações, estoque e lightbox da galeria Instagram
- Barra de progresso, voltar ao topo e atalhos (`B` sacola, `F` favoritos)
- Conta demo, newsletter, cookies LGPD e WhatsApp

## Estrutura

```
├── index.html
├── css/app.css
├── css/pro.css
├── js/
├── partials/app-shell.html
├── assets/template/
├── DESIGN.md
└── template-manifest.json
```

## Como visualizar

```powershell
start index.html
```

## Design system

Ver [`DESIGN.md`](./DESIGN.md).


## SEO

Base pública configurada: `https://guilhermeh4sh.github.io/visor-landing-page`

Arquivos de suporte:

- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- Metadados Open Graph / Twitter e JSON-LD em `index.html`
