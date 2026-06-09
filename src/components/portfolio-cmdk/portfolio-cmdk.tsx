import { Component, h, Prop, State, Event, EventEmitter, Watch, Element } from '@stencil/core';
import { COMMAND_PALETTE, CmdItem, Lang, T, tx } from '../../utils/data';

@Component({
  tag: 'portfolio-cmdk',
  shadow: false,
})
export class PortfolioCmdk {
  @Prop() locale: Lang = 'pt';
  @Prop() open: boolean = false;
  @State() q: string = '';
  @State() active: number = 0;
  @Event() cmdClose: EventEmitter<void>;
  @Event() cmdAction: EventEmitter<{ action: string }>;
  @Element() host: HTMLElement;

  @Watch('open')
  onOpen(newVal: boolean) {
    if (newVal) {
      this.q = '';
      this.active = 0;
      setTimeout(() => {
        const input = this.host.querySelector('input');
        if (input) (input as HTMLInputElement).focus();
      }, 30);
    }
  }

  private filtered(): CmdItem[] {
    const t = this.q.trim().toLowerCase();
    if (!t) return COMMAND_PALETTE;
    return COMMAND_PALETTE.filter((c) =>
      tx(c.k, this.locale).toLowerCase().includes(t) || c.s.toLowerCase().includes(t)
    );
  }

  private run = (item: CmdItem) => {
    if (item.href) {
      if (item.href.startsWith('#')) {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.open(item.href, '_blank', 'noreferrer');
      }
    } else if (item.action) {
      this.cmdAction.emit({ action: item.action });
    }
    this.cmdClose.emit();
  };

  private handleKey = (e: KeyboardEvent) => {
    const f = this.filtered();
    if (e.key === 'ArrowDown') { e.preventDefault(); this.active = Math.min(this.active + 1, f.length - 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); this.active = Math.max(this.active - 1, 0); }
    else if (e.key === 'Enter') { e.preventDefault(); if (f[this.active]) this.run(f[this.active]); }
    else if (e.key === 'Escape') { this.cmdClose.emit(); }
  };

  render() {
    if (!this.open) return null;
    const L = this.locale;
    const f = this.filtered();
    return (
      <div class="cmdk-back" onClick={() => this.cmdClose.emit()}>
        <div class="cmdk" onClick={(e) => e.stopPropagation()}>
          <div class="cmdk-input">
            <span class="ic">⌘</span>
            <input
              value={this.q}
              onInput={(e) => { this.q = (e.target as HTMLInputElement).value; this.active = 0; }}
              onKeyDown={this.handleKey}
              placeholder={tx(T.cmdk.placeholder, L)}
            />
            <span class="esc">ESC</span>
          </div>
          <div class="cmdk-list">
            {f.length === 0 && <div class="cmdk-empty">{tx(T.cmdk.empty, L)}</div>}
            {f.map((item, i) => (
              <div
                class={'cmdk-row ' + (i === this.active ? 'active' : '')}
                onMouseEnter={() => (this.active = i)}
                onClick={() => this.run(item)}
              >
                <span>{tx(item.k, L)}</span>
                <span class="s">{item.s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
