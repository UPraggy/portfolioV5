import { Component, h, State } from '@stencil/core';

interface TermLine { type: 'p' | 'c' | 'ok' | 'warn' | 'fail'; text: string; cont?: string; }

const LINES: TermLine[] = [
  { type: 'p',    text: 'ledgb> ', cont: 'criar README.md do projeto' },
  { type: 'c',    text: '→ task scope: workspace/' },
  { type: 'c',    text: '→ provider: google-ai · model: gemini-2.5-pro' },
  { type: 'warn', text: '⚡ 429 rate-limit · fallback → openrouter-free' },
  { type: 'ok',   text: '✓ stream ok · 1,847 tokens · 2.1s' },
  { type: 'ok',   text: '✓ write_file README.md · 3.4kb' },
  { type: 'p',    text: 'ledgb> ', cont: '' },
];

@Component({
  tag: 'portfolio-terminal',
  shadow: false,
})
export class PortfolioTerminal {
  @State() tick: number = 0;
  private timer: any;

  connectedCallback() {
    this.timer = setInterval(() => (this.tick = this.tick + 1), 1600);
  }
  disconnectedCallback() { clearInterval(this.timer); }

  render() {
    const visible = Math.min(LINES.length, this.tick + 1);
    return (
      <div class="terminal">
        <div class="terminal-bar">
          <span class="d r"></span>
          <span class="d y"></span>
          <span class="d g"></span>
          <span class="t">ledgb · ~/projects/portifoliov5</span>
        </div>
        <div class="terminal-body">
          {LINES.slice(0, visible).map((l, i) => (
            <div class={l.type}>
              {l.type === 'p'
                ? [<span style={{ color: 'var(--accent)' }}>{l.text}</span>,
                   <span style={{ color: 'var(--fg-1)' }}>{l.cont}</span>]
                : <span class={l.type}>{l.text}</span>}
              {i === visible - 1 && l.type === 'p' && !l.cont ? <span class="cursor"></span> : null}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
