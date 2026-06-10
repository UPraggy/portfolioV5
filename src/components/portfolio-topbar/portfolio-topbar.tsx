import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { Lang, T, tx } from '../../utils/data';

@Component({
  tag: 'portfolio-topbar',
  shadow: false,
})
export class PortfolioTopbar {
  @Prop() locale: Lang = 'pt';
  @Event() cmdK: EventEmitter<void>;

  render() {
    return (
      <div class="topbar">
        <div class="topbar-inner">
          <a href="#top" class="brand" aria-label="Rafael MR · topo">
            <svg class="rm-mark" viewBox="-2 16 122 90" aria-hidden="true">
              <g transform="translate(0.93,88.7)">
                <path d="M16.24 0L5.41 0L5.41-57.40L30.34-57.40Q35.75-57.40 39.77-55.51Q43.79-53.63 46.00-50.18Q48.22-46.74 48.22-42.07L48.22-42.07L48.22-41.08Q48.22-35.92 45.76-32.72Q43.30-29.52 39.69-28.04L39.69-28.04L39.69-26.57Q42.97-26.40 44.77-24.31Q46.58-22.22 46.58-18.78L46.58-18.78L46.58 0L35.75 0L35.75-17.22Q35.75-19.19 34.73-20.42Q33.70-21.65 31.32-21.65L31.32-21.65L16.24-21.65L16.24 0ZM16.24-47.56L16.24-31.49L29.19-31.49Q33.05-31.49 35.22-33.58Q37.39-35.67 37.39-39.11L37.39-39.11L37.39-39.93Q37.39-43.38 35.26-45.47Q33.13-47.56 29.19-47.56L29.19-47.56L16.24-47.56Z" fill="none" stroke="#9DB1EA" stroke-width="3.1" stroke-linejoin="round" />
                <path d="M61.73 0L51.24 0L51.24-57.40L71.33-57.40L81.25-7.38L82.72-7.38L92.65-57.40L112.74-57.40L112.74 0L102.24 0L102.24-49.45L100.76-49.45L90.92 0L73.05 0L63.21-49.45L61.73-49.45L61.73 0Z" fill="#EAA94E" fill-opacity="0.22" stroke="#EAA94E" stroke-width="3.1" stroke-linejoin="round" />
              </g>
              <g fill="none" stroke="#9DB1EA" stroke-width="1.6">
                <circle cx="24" cy="24" r="2.6" />
                <circle cx="96" cy="96" r="2.6" />
              </g>
            </svg>
            <span><b>RAFAEL MR</b> · v5 · 2026</span>
          </a>
          <nav class="nav">
            <a href="#ledgb"      class="navlink">{tx(T.nav.ledgb, this.locale)}</a>
            <a href="#stack"      class="navlink">{tx(T.nav.stack, this.locale)}</a>
            <a href="#projects"   class="navlink">{tx(T.nav.projects, this.locale)}</a>
            <a href="#trajectory" class="navlink">{tx(T.nav.trajectory, this.locale)}</a>
            <a href="#contact"    class="navlink">{tx(T.nav.contact, this.locale)}</a>
            <button class="kbd" onClick={() => this.cmdK.emit()} title="Open command palette">
              <span>Ctrl+</span><span>K</span>
            </button>
          </nav>  
        </div>
      </div>
    );
  }
}
