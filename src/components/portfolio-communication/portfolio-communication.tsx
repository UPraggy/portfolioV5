import { Component, h, Prop, Element } from '@stencil/core';
import { TRILHA, META_SKILLS, Lang, T, tx } from '../../utils/data';
import { attachReveal } from '../../utils/utils';

@Component({
  tag: 'portfolio-communication',
  shadow: false,
})
export class PortfolioCommunication {
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
      <section class="sect wrap reveal" id="communication">
        <portfolio-sect-head
          num={tx(T.comm.num, L)}
          titleHtml={tx(T.comm.title, L)}
          sub={tx(T.comm.sub, L)}
        ></portfolio-sect-head>

        <div class="comm-grid">
          <div class="yt-card">
            <div class="yt-card-head">
              <div class="label">YOUTUBE · @RAFAELMRDEV</div>
              <div class="yt-stat">{tx(T.comm.ytStat, L)}</div>
            </div>
            <h3 innerHTML={tx(T.comm.ytTitle, L)}></h3>
            <p>{tx(T.comm.ytLede, L)}</p>

            <ol class="trilha-list">
              {TRILHA.map((t, i) => (
                <li>
                  <span class="ti">{String(i + 1).padStart(2, '0')}</span>
                  <span class="tt">{tx(t, L)}</span>
                </li>
              ))}
            </ol>

            <p class="muted-2 yt-roadmap">{tx(T.comm.ytRoadmap, L)}</p>

            <a class="cta" href="https://youtube.com/@RafaelMRDev" target="_blank" rel="noreferrer">
              {tx(T.comm.ytCta, L)}
            </a>
          </div>

          <div class="comm-side">
            <div class="meta-card">
              <div class="eyebrow">{tx(T.comm.metaEyebrow, L)}</div>
              <p class="meta-lede">{tx(T.comm.metaLede, L)}</p>
              <div class="meta-grid">
                {META_SKILLS.map((s) => (
                  <div class="meta-item">
                    <span class="meta-tick">+</span>
                    <span>{tx(s, L)}</span>
                  </div>
                ))}
              </div>
              <div class="meta-quote" innerHTML={tx(T.comm.metaQuote, L)}></div>
            </div>

            <div class="diff-stack">
              <div class="diff-item">
                <div class="n">A</div>
                <h4>{tx(T.comm.diffAh, L)}</h4>
                <p>{tx(T.comm.diffAp, L)}</p>
              </div>
              <div class="diff-item">
                <div class="n">B</div>
                <h4>{tx(T.comm.diffBh, L)}</h4>
                <p>{tx(T.comm.diffBp, L)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
