import { Component, h, Prop, Element } from '@stencil/core';
import { STACK, STACK_RULES, Lang, T, tx } from '../../utils/data';
import { attachReveal } from '../../utils/utils';

@Component({
  tag: 'portfolio-stack',
  shadow: false,
})
export class PortfolioStack {
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
    return (
      <section class="sect wrap reveal" id="stack">
        <portfolio-sect-head
          num={tx(T.stack.num, L)}
          titleHtml={tx(T.stack.title, L)}
          sub={tx(T.stack.sub, L)}
        ></portfolio-sect-head>
        <div class="stack-grid">
          {STACK.map((g) => (
            <div class="stack-cell">
              <h4>{tx(g.group, L)}</h4>
              <ul>
                {g.items.map((it) => <li>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div class="rules-banner">
          {STACK_RULES.map((r) => (
            <div class="row">
              <span class="rk">{tx(r.k, L)}</span>
              <span class="rv">{tx(r.v, L)}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
