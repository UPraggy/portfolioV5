// reveal-on-scroll helper for Stencil components.
// Sem JS (ou com IO indisponivel) o conteudo aparece imediatamente (.in) — nunca esconde
// conteudo prerenderizado de forma permanente. Com JS + motion permitido, anima os filhos
// em cascata (stagger) via anime.js, no estilo do portfolio V4.

type RevealOpts = {
  items?: string;        // seletor dos filhos que entram em cascata
  axis?: 'y' | 'x';      // direcao da entrada (default y)
  dist?: number;         // deslocamento inicial em px
  gap?: number;          // atraso entre itens (stagger) em ms
  dur?: number;          // duracao de cada item em ms
};

// carrega o anime.js uma unica vez, so no cliente (nunca durante o prerender em Node)
let animeP: Promise<typeof import('animejs')> | null = null;
function loadAnime() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no-window'));
  if (!animeP) animeP = import('animejs');
  return animeP;
}

function prefersReduced(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function attachReveal(host: HTMLElement, opts: RevealOpts = {}): () => void {
  if (!host) return () => {};
  // sem IntersectionObserver: mostra tudo de imediato
  if (typeof IntersectionObserver === 'undefined') {
    host.classList.add('in');
    return () => {};
  }

  const reduce = prefersReduced();
  const animated = !!opts.items && !reduce;

  // aquece o chunk do anime.js cedo (enquanto o usuario le o hero), evitando atraso no scroll
  if (animated) loadAnime().catch(() => {});

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        io.unobserve(el);

        const items = animated
          ? Array.from(el.querySelectorAll<HTMLElement>(opts.items as string))
          : [];

        if (!items.length) {
          el.classList.add('in');
          return;
        }

        // pre-esconde os filhos enquanto o pai ainda esta invisivel (.reveal opacity:0)
        // => zero flash. So entao revela o pai e dispara a cascata.
        items.forEach((it) => {
          it.style.opacity = '0';
          it.style.willChange = 'transform, opacity';
        });
        el.classList.add('in');

        loadAnime()
          .then(({ animate, stagger }) => {
            const axis = opts.axis === 'x' ? 'translateX' : 'translateY';
            const dist = opts.dist ?? (opts.axis === 'x' ? 44 : 22);
            animate(items, {
              opacity: [0, 1],
              [axis]: [dist, 0],
              delay: stagger(opts.gap ?? 70),
              duration: opts.dur ?? 720,
              ease: 'out(3)',
              onComplete: () => items.forEach((it) => { it.style.willChange = ''; }),
            });
          })
          .catch(() => {
            // se o anime nao carregar, restaura visibilidade (nada de conteudo sumido)
            items.forEach((it) => { it.style.opacity = ''; it.style.willChange = ''; });
          });
      });
    },
    { threshold: 0.1 }
  );

  io.observe(host);
  return () => io.disconnect();
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  return new Promise((resolve) => {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    resolve();
  });
}
