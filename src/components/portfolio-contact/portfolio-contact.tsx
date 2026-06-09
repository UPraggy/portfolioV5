import { Component, h, Prop, Event, EventEmitter, Element } from '@stencil/core';
import { RAFAEL, Lang, T, tx } from '../../utils/data';
import { attachReveal } from '../../utils/utils';

@Component({
  tag: 'portfolio-contact',
  shadow: false,
})
export class PortfolioContact {
  @Prop() locale: Lang = 'pt';
  @Event() copyEmail: EventEmitter<void>;
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
      <section class="contact wrap reveal" id="contact">
        <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 'clamp(40px, 6vw, 80px)' }}>
          <div class="eyebrow" style={{ marginBottom: '24px' }}>{tx(T.contact.num, L)}</div>
          <h2 class="contact-h" innerHTML={tx(T.contact.title, L)}></h2>
          <div class="contact-grid">
            <button class="contact-cell" onClick={() => this.copyEmail.emit()} title="click to copy">
              <div class="l">EMAIL</div>
              <div class="v">{RAFAEL.email} <span class="arr">↗</span></div>
            </button>
            <a class="contact-cell" href={'https://' + RAFAEL.links.linkedin} target="_blank" rel="me noreferrer">
              <div class="l">LINKEDIN</div>
              <div class="v">in/rafaelmrdev <span class="arr">↗</span></div>
            </a>
            <a class="contact-cell" href={'https://' + RAFAEL.links.github} target="_blank" rel="me noreferrer">
              <div class="l">GITHUB</div>
              <div class="v">@UPraggy <span class="arr">↗</span></div>
            </a>
            <a class="contact-cell" href={'https://' + RAFAEL.links.youtube} target="_blank" rel="me noreferrer">
              <div class="l">YOUTUBE</div>
              <div class="v">@RafaelMRDev <span class="arr">↗</span></div>
            </a>
          </div>
          <div class="foot">
            <span>© 2026 · RAFAEL MOREIRA RAMOS DE REZENDE</span>
            <span>BELO HORIZONTE · BR · GMT-3</span>
            <span>{tx(T.contact.footMade, L)} <span class="heart">●</span> {tx(T.contact.footIn, L)}</span>
          </div>
        </div>
      </section>
    );
  }
}
