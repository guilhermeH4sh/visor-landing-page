# VISOR Landing Page

Landing editorial da marca **VISOR** (óculos premium).

## Stack

- HTML estático de alta fidelidade
- Tailwind CSS v4 (embutido)
- Camada interativa em ES modules (`js/`, `css/app.css`)
- Tipografia: Playfair Display + Hanken Grotesk
- Imagens em `assets/template/`

## Interatividade

- Sacola com persistência local, frete grátis acima de R$ 399 e checkout demo
- Busca ao vivo (`?q=` na URL) e visualização rápida de produtos
- Favoritos sincronizados nos cards da coleção
- Menu mobile, scroll suave e header com efeito ao rolar
- Conta demo, newsletter validada, banner de cookies e botão WhatsApp

## Estrutura

```
├── index.html
├── css/app.css
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
