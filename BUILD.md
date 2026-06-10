# Portfolio V5 — Build & Deploy

Portfolio pessoal do Rafael Moreira Ramos de Rezende. Web Components com **Stencil**,
bilingue **PT/EN**, pre-renderizado (HTML estatico crawlavel) e otimizado para descoberta
(JSON-LD, OpenGraph, hreflang, robots para crawlers de IA, sitemap, llms.txt).

## Stack
- `@stencil/core` ^4 (light DOM nos componentes do portfolio = texto indexavel)
- Single source of truth de i18n/dados: `src/utils/data.ts`
- Pre-render via `stencil build --prerender` + `prerender.config.ts`

## Rodar local
```bash
npm install
npm start            # dev server com watch
npm run build        # build de producao + prerender -> www/
npx serve www        # servir o build estatico localmente
```
O build gera `www/` (ignorado no git — e artefato de CI).

## Estrutura
- `src/index.html` — host pt (raiz). Prerender tambem gera `www/en/index.html`.
- `src/components/app-portfolio/` — app raiz; detecta idioma por URL (`/en/`), faz threading de `locale` para os filhos.
- `src/components/portfolio-*` — secoes (hero, manifesto, stack, ledgb, projects, trajectory, communication, contact, cmdk).
- `src/components/my-taypage/` — **pagina extra "NossoAmor"** (portada do V4, pessoal, para a Tay). Host: `src/nossoamor.html` -> `/nossoamor/`. Marcada `noindex` e fora do sitemap.
- `src/utils/data.ts` — textos PT/EN, stack, projetos, timeline, principios, command palette.
- `src/global/` — `app.ts`, `styles.css` (portfolio) e `colors.css`/`fonts.css` (NossoAmor).
- `src/static/` — assets da NossoAmor (fotos/audio/fontes), copiados para `www/portifoliov5/static/`.

## Deploy — GitHub Pages
Workflow: `.github/workflows/pages.yml` (build no push para `main`, deploy de `www/`).

**Passos manuais unicos (precisam da conta do Rafael):**
1. **Settings -> Pages -> Source: "GitHub Actions"** (habilita o deploy via workflow).
2. **Dominio custom:** o build publica `CNAME = rafaelmr.com.br`. Para o site abrir certo,
   apontar o DNS do dominio para o GitHub Pages:
   - `A` -> 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153
   - ou `CNAME` `www` -> `upraggy.github.io`
   Em Settings -> Pages, confirmar o custom domain `rafaelmr.com.br` e marcar *Enforce HTTPS*.

> Importante: canonical, OpenGraph e sitemap usam URLs absolutas `https://rafaelmr.com.br/`.
> Por isso o deploy assume o dominio custom (servido na RAIZ). Enquanto o DNS nao propaga,
> a URL crua `upraggy.github.io/portfolioV5/` quebra os caminhos absolutos (`/build`, `/assets`).
> Para preview imediato sem dominio, use `npx serve www` local.

## Idiomas
- PT: `/` · EN: `/en/`. Toggle na topbar. Deteccao por path no `componentWillLoad`.
