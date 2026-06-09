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
          <a href="#top" class="brand">
            <span class="dot"></span>
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
