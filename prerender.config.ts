import { PrerenderConfig } from '@stencil/core';

const BASE = 'https://rafaelmr.com.br';

// gera apenas as duas paginas de idioma; o app detecta lang pela URL (/en -> en)
export const config: PrerenderConfig = {
  entryUrls: ['/', '/en/'],
  crawlUrls: false,
  trailingSlash: true,

  hydrateOptions() {
    return { prettyHtml: true };
  },

  // localiza o <head> por pagina (corpo ja vem traduzido pelo proprio app)
  afterHydrate(document: any, url: any) {
    const isEn = /\/en(\/|$)/.test(url.pathname);
    const href = BASE + url.pathname;

    document.documentElement.setAttribute('lang', isEn ? 'en' : 'pt-BR');

    const set = (sel: string, attr: string, val: string) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };
    set('link[rel="canonical"]', 'href', href);
    set('meta[property="og:url"]', 'content', href);
    set('meta[property="og:locale"]', 'content', isEn ? 'en_US' : 'pt_BR');
    set('meta[property="og:locale:alternate"]', 'content', isEn ? 'pt_BR' : 'en_US');

    if (isEn) {
      const title = 'Rafael Moreira Ramos · AI Developer & Fullstack Engineer';
      const desc =
        'Rafael Moreira Ramos de Rezende — AI Developer & Fullstack Engineer in Belo Horizonte, Brazil. Creator of the LEDGB Orchestrator. Stencil, Node, React, AI agents.';
      document.title = title;
      set('meta[name="description"]', 'content', desc);
      set('meta[property="og:title"]', 'content', title);
      set('meta[property="og:description"]', 'content',
        'Creator of the LEDGB Orchestrator. AI Developer & Fullstack Engineer in Belo Horizonte, Brazil.');
      set('meta[name="twitter:description"]', 'content',
        'Creator of the LEDGB Orchestrator. AI Developer & Fullstack Engineer · Belo Horizonte, Brazil.');
    }
  },

  // robots permissivo, explicitando crawlers de IA + sitemap
  robotsTxt(opts: any) {
    const sitemapUrl = opts && opts.sitemapUrl ? opts.sitemapUrl : `${BASE}/sitemap.xml`;
    const lines = [
      'User-agent: *',
      'Allow: /',
      '',
      '# crawlers de IA explicitamente liberados',
      'User-agent: GPTBot',
      'Allow: /',
      'User-agent: ClaudeBot',
      'Allow: /',
      'User-agent: Claude-Web',
      'Allow: /',
      'User-agent: PerplexityBot',
      'Allow: /',
      'User-agent: Google-Extended',
      'Allow: /',
      '',
      `Sitemap: ${sitemapUrl}`,
    ];
    return lines.join('\n');
  },
};
