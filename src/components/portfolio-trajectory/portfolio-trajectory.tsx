import { Component, h, Prop, Element } from '@stencil/core';
import { TIMELINE, Lang, T, tx } from '../../utils/data';
import { attachReveal } from '../../utils/utils';

@Component({
  tag: 'portfolio-trajectory',
  shadow: false,
})
export class PortfolioTrajectory {
  @Prop() locale: Lang = 'pt';
  @Element() host: HTMLElement;
  private detachReveal?: () => void;

  componentDidLoad() {
    const sect = this.host.querySelector('section');
    if (sect) this.detachReveal = attachReveal(sect as HTMLElement, { items: '.tl-row', axis: 'x', dist: 32, gap: 50 });
  }
  disconnectedCallback() { this.detachReveal?.(); }

  render() {
    const L = this.locale;
    return (
      <section class="sect wrap reveal" id="trajectory">
        <portfolio-sect-head
          num={tx(T.trajectory.num, L)}
          titleHtml={tx(T.trajectory.title, L)}
          sub={tx(T.trajectory.sub, L)}
        ></portfolio-sect-head>
        <div class="timeline">
          {TIMELINE.map((row, i) => (
            <div class={'tl-row ' + (i === TIMELINE.length - 1 ? 'current' : '')}>
              <div class="y">{row.y}</div>
              <div class="body">
                <div class="t">{tx(row.t, L)}</div>
                <div class="d">{tx(row.d, L)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
