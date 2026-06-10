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
    if (sect) this.detachReveal = attachReveal(sect as HTMLElement, { items: '.contact-cell', gap: 55, dist: 22 });
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
          <div class="brand-lockup">
            <svg class="rm-mark" viewBox="-2 16 122 90" aria-label="Rafael MR">
              <g transform="translate(0.93,88.7)">
                <path d="M16.24 0L5.41 0L5.41-57.40L30.34-57.40Q35.75-57.40 39.77-55.51Q43.79-53.63 46.00-50.18Q48.22-46.74 48.22-42.07L48.22-42.07L48.22-41.08Q48.22-35.92 45.76-32.72Q43.30-29.52 39.69-28.04L39.69-28.04L39.69-26.57Q42.97-26.40 44.77-24.31Q46.58-22.22 46.58-18.78L46.58-18.78L46.58 0L35.75 0L35.75-17.22Q35.75-19.19 34.73-20.42Q33.70-21.65 31.32-21.65L31.32-21.65L16.24-21.65L16.24 0ZM16.24-47.56L16.24-31.49L29.19-31.49Q33.05-31.49 35.22-33.58Q37.39-35.67 37.39-39.11L37.39-39.11L37.39-39.93Q37.39-43.38 35.26-45.47Q33.13-47.56 29.19-47.56L29.19-47.56L16.24-47.56Z" fill="none" stroke="#9DB1EA" stroke-width="3.1" stroke-linejoin="round" />
                <path d="M61.73 0L51.24 0L51.24-57.40L71.33-57.40L81.25-7.38L82.72-7.38L92.65-57.40L112.74-57.40L112.74 0L102.24 0L102.24-49.45L100.76-49.45L90.92 0L73.05 0L63.21-49.45L61.73-49.45L61.73 0Z" fill="#EAA94E" fill-opacity="0.22" stroke="#EAA94E" stroke-width="3.1" stroke-linejoin="round" />
              </g>
              <g fill="none" stroke="#9DB1EA" stroke-width="1.6">
                <circle cx="24" cy="24" r="2.6" />
                <circle cx="96" cy="96" r="2.6" />
              </g>
            </svg>
            <div class="bl-txt">
              <div class="bl-name">RAFAEL MR</div>
              <div class="bl-disc">DEV <b>·</b> DESIGN <b>·</b> INFRA <b>·</b> COMUNICAÇÃO</div>
            </div>
            <div class="bl-site">RAFAELMR.COM.BR</div>
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
