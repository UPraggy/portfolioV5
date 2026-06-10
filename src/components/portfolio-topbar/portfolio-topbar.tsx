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
            <svg class="rm-mark" viewBox="0 0 46 28" fill="none" aria-hidden="true">
              <path d="M4 24 V4 H13 A5 5 0 0 1 13 13 H4 M5 13 L16 24" stroke="#9DB1EA" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M23 24 V4 L32 14 L41 4 V24" stroke="#EAA94E" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="4" cy="4" r="1.5" fill="#F1EDE2" />
              <circle cx="41" cy="4" r="1.5" fill="#F1EDE2" />
              <circle cx="32" cy="14" r="1.5" fill="#EAA94E" />
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
              <span>⌘</span><span>K</span>
            </button>
          </nav>
        </div>
      </div>
    );
  }
}
