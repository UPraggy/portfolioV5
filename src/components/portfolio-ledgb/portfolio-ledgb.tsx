import { Component, h, Prop, Element } from '@stencil/core';
import { PROJECTS, Lang, Project, T, tx } from '../../utils/data';
import { attachReveal } from '../../utils/utils';

@Component({
  tag: 'portfolio-ledgb',
  shadow: false,
})
export class PortfolioLedgb {
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
    const ledgb = PROJECTS.find((p) => p.id === 'ledgb') as Project;
    return (
      <section class="sect wrap reveal" id="ledgb">
        <portfolio-sect-head
          num={tx(T.ledgb.num, L)}
          titleHtml={tx(T.ledgb.title, L)}
          sub={tx(T.ledgb.sub, L)}
        ></portfolio-sect-head>
        <div class="ledgb">
          <div class="ledgb-grid">
            <div class="ledgb-left">
              <div class="ledgb-tag">
                <span class="pill">{tx(T.ledgb.badge, L)}</span>
                <span>SOLO · 1 DEV</span>
              </div>
              <div class="ledgb-brand">
                <img src="/assets/ledgb-logo.png" alt="LEDGB logo" class="ledgb-logo" />
                <div>
                  <h3>LEDGB <em>Orchestrator</em></h3>
                  <div class="ledgb-sub">{tx(T.ledgb.sublabel, L)}</div>
                </div>
              </div>
              <p class="pitch">{tx(ledgb.pitch, L)}</p>
              <ul class="ledgb-bullets">
                {ledgb.bullets?.map((b) => <li>{tx(b, L)}</li>)}
              </ul>
              <div class="ledgb-chips">
                {ledgb.stack.map((s) => <span class="chip">{s}</span>)}
                <span class="chip accent">Local-first</span>
                <span class="chip accent">Free-by-default</span>
              </div>
            </div>
            <div class="ledgb-right">
              <div class="ledgb-shot-wrap">
                <div class="ledgb-shot-bar">
                  <span class="d r"></span>
                  <span class="d y"></span>
                  <span class="d g"></span>
                  <span class="t">LEDGB Orchestrator · home</span>
                </div>
                <img src="/assets/ledgb-home.png" alt="LEDGB Orchestrator home screen" class="ledgb-shot" />
              </div>
              <div class="ledgb-metrics">
                {ledgb.metrics?.map((m) => (
                  <div class="ledgb-metric">
                    <div class="v">{m.v}</div>
                    <div class="l">{tx(m.l, L)}</div>
                  </div>
                ))}
              </div>
              <portfolio-terminal></portfolio-terminal>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
