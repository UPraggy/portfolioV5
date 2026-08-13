import { Component, h, Prop, Element } from '@stencil/core';
import { PROJECTS, Lang, T, tx } from '../../utils/data';
import { attachReveal } from '../../utils/utils';

@Component({
  tag: 'portfolio-projects',
  shadow: false,
})
export class PortfolioProjects {
  @Prop() locale: Lang = 'pt';
  @Element() host: HTMLElement;
  private detachReveal?: () => void;

  componentDidLoad() {
    const sect = this.host.querySelector('section');
    if (sect) this.detachReveal = attachReveal(sect as HTMLElement, { items: '.proj', axis: 'x', dist: 40, gap: 80 });
  }
  disconnectedCallback() { this.detachReveal?.(); }

  // extrai o ano mais recente do rotulo (ex.: '2026', 'Jul/2023—', 'Out/2023 · Jul/2024')
  private yearKey(year: string): number {
    const anos = (year.match(/\d{4}/g) || []).map(Number);
    return anos.length ? Math.max(...anos) : 0;
  }

  render() {
    const L = this.locale;
    // mais recentes primeiro; sort estavel mantem a ordem original dentro do mesmo ano
    const rest = PROJECTS.filter((p) => !p.featured).sort((a, b) => this.yearKey(b.year) - this.yearKey(a.year));
    return (
      <section class="sect wrap reveal" id="projects">
        <portfolio-sect-head
          num={tx(T.projects.num, L)}
          titleHtml={tx(T.projects.title, L)}
          sub={tx(T.projects.sub, L)}
        ></portfolio-sect-head>
        <div class="proj-list">
          {rest.map((p) => {
            // card com link vira <a> (nova aba); sem link continua <div>
            const Tag: any = p.link ? 'a' : 'div';
            const linkAttrs: any = p.link ? { href: p.link, target: '_blank', rel: 'noreferrer' } : {};
            return (
              <Tag class={`proj${p.link ? ' proj-link' : ''}`} {...linkAttrs}>
                <div class="yr">{p.year}</div>
                <div>
                  <div class="name">{tx(p.name, L)}</div>
                  <div class="role">{tx(p.role, L)}</div>
                </div>
                <div class="pitch">
                  <p class="pitch-lede">{tx(p.pitch, L)}</p>
                  {p.bullets && (
                    <ul class="proj-bul">
                      {p.bullets.map((b) => <li>{tx(b, L)}</li>)}
                    </ul>
                  )}
                  {p.metrics && (
                    <div class="proj-metrics">
                      {p.metrics.map((m) => (
                        <div class="pm">
                          <span class="pm-v">{m.v}</span>
                          <span class="pm-l">{tx(m.l, L)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div class="right">
                  {p.stack.map((s) => <span class="chip">{s}</span>)}
                </div>
              </Tag>
            );
          })}
        </div>
      </section>
    );
  }
}
