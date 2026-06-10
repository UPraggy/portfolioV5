# Rafael MR · Portfolio V5

Portfólio pessoal do **Rafael Moreira Ramos de Rezende** — Dev Full Stack.
Construído com **Stencil** (Web Components), **bilíngue PT/EN**, pré-renderizado
(HTML estático crawlável) e otimizado para descoberta por buscadores e por IA
(JSON-LD `schema.org/Person`, OpenGraph, hreflang, `robots.txt` para crawlers de
LLM, `sitemap.xml`, `llms.txt`).

🔗 **Produção:** https://rafaelmr.com.br/ · 🇬🇧 https://rafaelmr.com.br/en/

> Continuação do [portfólio V4](https://github.com/UPraggy/portifioliov4) — mesma
> identidade visual (espresso + amber), mesma família de fontes e logo. O V5 também
> reúne a página extra **NossoAmor** (`/nossoamor/`), portada fiel do V4.

## Stack
- `@stencil/core` ^4 — componentes em light DOM (texto indexável pela máquina)
- Fonte única de i18n/conteúdo: `src/utils/data.ts`
- Pré-render: `stencil build --prerender` + `prerender.config.ts`
- Deploy: GitHub Pages via GitHub Actions (`.github/workflows/pages.yml`)
- Sem libs externas no runtime — reveal-on-scroll, command palette e terminal são vanilla

## Estrutura (na raiz do repo)
```
stencil.config.ts          ← config (namespace, baseUrl, copy targets, prerender)
prerender.config.ts        ← gera / (pt) e /en/ + sitemap
package.json · tsconfig.json
src/
├── index.html             ← host pt (raiz). Prerender também gera www/en/index.html
├── nossoamor.html         ← host da página da Tay → /nossoamor/ (noindex)
├── CNAME · llms.txt
├── global/                ← app.ts, styles.css (portfolio) + colors.css/fonts.css (NossoAmor)
├── assets/                ← imagens (logo/screenshot LEDGB)
├── static/                ← assets da NossoAmor (fotos/áudio/fontes) → www/portifoliov5/static/
├── utils/                 ← data.ts (textos PT/EN, projetos, timeline) + utils.ts
└── components/
    ├── app-portfolio/     ← raiz · idioma por URL, accent, Cmd+K, toast
    ├── portfolio-*        ← seções (topbar, hero, manifesto, stack, ledgb, terminal,
    │                         projects, trajectory, communication, contact, cmdk)
    └── my-taypage/        ← página NossoAmor (pessoal, portada do V4)
```

## Rodar local
```bash
npm install
npm start            # dev server com watch (http://localhost:3333)
npm run build        # build de produção + prerender -> www/
npx serve www        # servir o build estático localmente
```

## Deploy
Build automático no push para `main` → publica `www/` no GitHub Pages.
Passos manuais (DNS + Pages Source) e detalhes em **[BUILD.md](./BUILD.md)**.

## Idiomas
PT em `/` · EN em `/en/`. Toggle na topbar; detecção por path no `componentWillLoad`.

## Decisões de design
- **Light DOM** (`shadow: false`) nos componentes do portfólio: o CSS é global em
  `src/global/styles.css`, o texto fica indexável e o accent troca via `html[data-accent]`.
  A `my-taypage` (NossoAmor) é a exceção — usa `shadow: true`, fiel ao V4.
- **TypeScript só onde o Stencil obriga.** No restante do meu stack a regra continua
  JSX puro / Node — TS aqui é exigência do framework, não preferência.
- **`my-taypage` é pessoal:** `noindex,nofollow` e fora do `sitemap.xml`.
