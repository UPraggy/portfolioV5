# Rafael MR · Portfolio V5 — Stencil port

Port do portfólio V5 (que vive em `../index.html` como prototype React) para Stencil + Web Components — pra plugar no seu setup do V4 (`rafaelmr.com.br`).

## Estrutura

```
stencil/
├── stencil.config.ts
├── package.json
├── tsconfig.json
└── src/
    ├── index.html                          ← entry de dev (stencil serve)
    ├── global/
    │   ├── app.ts                          ← bootstrap (set data-accent inicial)
    │   └── styles.css                      ← TODOS os estilos (global, sem shadow DOM)
    ├── assets/
    │   ├── ledgb-logo.png
    │   └── ledgb-home.png
    ├── utils/
    │   ├── data.ts                         ← conteúdo + tipos (Project, Lang, etc.)
    │   └── utils.ts                        ← attachReveal, copyToClipboard
    └── components/
        ├── app-portfolio/                  ← raiz · gerencia lang, accent, Cmd+K, toast
        ├── portfolio-topbar/
        ├── portfolio-hero/
        ├── portfolio-sect-head/            ← shared section header
        ├── portfolio-manifesto/
        ├── portfolio-stack/
        ├── portfolio-ledgb/                ← feature card com logo + screenshot
        ├── portfolio-terminal/             ← terminal animado dentro do LEDGB
        ├── portfolio-projects/
        ├── portfolio-trajectory/
        ├── portfolio-communication/
        ├── portfolio-contact/
        └── portfolio-cmdk/                 ← command palette ⌘K
```

## Decisões de design

- **`shadow: false` em todos os componentes.** O CSS é global (`src/global/styles.css`) e cascateia pra todos. Isso casa com o jeito que o V4 já trabalha — sem ter que duplicar variáveis CSS dentro de cada shadow root.
- **Tag names em `portfolio-*`** exceto a raiz (`app-portfolio`) — namespace claro pra não colidir com nada que você já tenha no V4.
- **TypeScript só onde Stencil obriga.** A regra do `DevProfile.md` de "JSX puro, NUNCA TypeScript" continua valendo no backend e em outros frontends — Stencil exige TS por baixo, então aqui é exceção pelo framework, não por gosto.
- **Sem libs externas.** Só `@stencil/core`. Tudo (reveal-on-scroll, command palette, terminal animado) é vanilla.

## Como rodar

```bash
cd stencil
npm install
npm start
```

Stencil sobe um dev server em `http://localhost:3333` com hot reload.

## Como plugar no V4

Tem dois caminhos:

### Opção 1 — substituir o V4

Copia `stencil/src/` por cima do `src/` do V4. Mantém o `stencil.config.ts` do V4 se você já configurou outputTargets de produção (CDN, S3, etc.).

### Opção 2 — manter V4 e V5 lado a lado (recomendado pra transição)

1. Copia os componentes `portfolio-*` pra `src/components/` do V4.
2. Copia `utils/data.ts` e `utils/utils.ts`.
3. Append `global/styles.css` no global do V4 — ou importa via `globalStyle` se ainda não tiver.
4. Cria uma rota nova (ex: `/v5`) que renderiza `<app-portfolio></app-portfolio>`. Quando estiver maduro, troca a home.

## Estado

- ✅ Todas as seções portadas
- ✅ Cmd+K palette funcional (com listener global via `@Listen`)
- ✅ Persistência de `lang` e `accent` em `localStorage`
- ✅ Reveal-on-scroll via `IntersectionObserver`
- ✅ Responsivo (breakpoints 1024 / 720 / 480 já no `styles.css`)
- ⚠️ Sem Tweaks panel — aquilo era preview-only do prototype React. Se quiser expor toggles no V5 produção, eu te monto algo nativo do V4.

## Notas sobre o CSS

O `styles.css` é exatamente o mesmo do prototype React. Como tudo é `shadow: false`, `:root` continua aplicando, `html[data-accent="amber|lime|cyan|rose"]` continua trocando o accent, e os breakpoints (`@media (max-width: 1024px)` etc.) funcionam normalmente.

## Comandos úteis

```bash
npm run build     # build de produção (www/ + dist/)
npm start         # dev server com watch
npm run generate  # scaffolding de novo componente
```
