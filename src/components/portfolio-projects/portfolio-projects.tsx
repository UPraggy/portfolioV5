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
    if (sect) this.detachReveal = attachReveal(sect as HTMLElement);
  }
  disconnectedCallback() { this.detachReveal?.(); }

  render() {
    const L = this.locale;
    const rest = PROJECTS.filter((p) => !p.featured);
    return (
      <section class="sect wrap reveal" id="projects">
        <portfolio-sect-head
          num={tx(T.projects.num, L)}
          titleHtml={tx(T.projects.title, L)}
          sub={tx(T.projects.sub, L)}
        ></portfolio-sect-head>
        <div class="proj-list">
          {rest.map((p) => (
            <div class="proj">
              <div class="yr">{p.year}</div>
              <div>
                <div class="name">{tx(p.name, L)}</div>
                <div class="role">{tx(p.role, L)}</div>
              </div>
              <div class="pitch">{tx(p.pitch, L)}</div>
              <div class="right">
                {p.stack.map((s) => <span class="chip">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
