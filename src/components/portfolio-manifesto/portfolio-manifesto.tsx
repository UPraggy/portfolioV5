import { Component, h, Prop, Element } from '@stencil/core';
import { PRINCIPLES, Lang, T, tx } from '../../utils/data';
import { attachReveal } from '../../utils/utils';

@Component({
  tag: 'portfolio-manifesto',
  shadow: false,
})
export class PortfolioManifesto {
  @Prop() locale: Lang = 'pt';
  @Element() host: HTMLElement;
  private detachReveal?: () => void;

  componentDidLoad() {
    const sect = this.host.querySelector('section');
    if (sect) this.detachReveal = attachReveal(sect as HTMLElement, { items: '.principle', gap: 65, dist: 24 });
  }
  disconnectedCallback() { this.detachReveal?.(); }

  render() {
    const L = this.locale;
    return (
      <section class="sect wrap reveal" id="manifesto">
        <portfolio-sect-head
          num={tx(T.manifesto.num, L)}
          titleHtml={tx(T.manifesto.title, L)}
          sub={tx(T.manifesto.sub, L)}
        ></portfolio-sect-head>
        <div class="principles">
          {PRINCIPLES.map((p) => (
            <div class="principle">
              <div class="n">{p.n}</div>
              <h3 class="t">{tx(p.t, L)}</h3>
              <p class="d">{tx(p.d, L)}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
