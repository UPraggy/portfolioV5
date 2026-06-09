import { Component, h, Host, State, Listen, Element } from '@stencil/core';
import { RAFAEL, Lang, T, tx } from '../../utils/data';
import { copyToClipboard } from '../../utils/utils';

@Component({
  tag: 'app-portfolio',
  shadow: false,
})
export class AppPortfolio {
  @Element() host: HTMLElement;

  @State() lang: Lang = 'pt';
  @State() accent: string = 'amber';
  @State() cmdkOpen: boolean = false;
  @State() toast: string = '';

  private toastTimer: any;

  componentWillLoad() {
    // idioma inicial: URL (/en -> en) tem prioridade para prerender correto,
    // depois localStorage, senao pt.
    const path = typeof location !== 'undefined' ? location.pathname : '/';
    const urlLang: Lang | null = /(^|\/)en(\/|$)/.test(path) ? 'en' : null;
    try {
      const saved = JSON.parse(localStorage.getItem('portfoliov5') || '{}');
      if (saved.accent) this.accent = saved.accent;
      if (urlLang) this.lang = urlLang;
      else if (saved.lang) this.lang = saved.lang;
    } catch {
      if (urlLang) this.lang = urlLang;
    }
    document.documentElement.setAttribute('data-accent', this.accent);
    document.documentElement.setAttribute('lang', this.lang === 'pt' ? 'pt-BR' : 'en');
  }

  private persist() {
    try {
      localStorage.setItem('portfoliov5', JSON.stringify({ lang: this.lang, accent: this.accent }));
    } catch {}
  }

  private setAccent(a: string) {
    this.accent = a;
    document.documentElement.setAttribute('data-accent', a);
    this.persist();
    this.showToast('Accent → ' + a);
  }

  private toggleLang() {
    this.lang = this.lang === 'pt' ? 'en' : 'pt';
    document.documentElement.setAttribute('lang', this.lang === 'pt' ? 'pt-BR' : 'en');
    this.persist();
    this.showToast(tx(T.toast.lang, this.lang) + this.lang.toUpperCase());
  }

  private async copyEmail() {
    await copyToClipboard(RAFAEL.email);
    this.showToast(tx(T.toast.emailCopied, this.lang) + RAFAEL.email);
  }

  private showToast(msg: string) {
    this.toast = msg;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toast = ''), 2000);
  }

  @Listen('keydown', { target: 'window' })
  handleKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.cmdkOpen = !this.cmdkOpen;
    }
  }

  private handleCmdAction = (e: CustomEvent<{ action: string }>) => {
    const action = e.detail.action;
    if (action === 'copyEmail') this.copyEmail();
    else if (action === 'toggleLang') this.toggleLang();
    else if (action.startsWith('accent:')) this.setAccent(action.split(':')[1]);
  };

  render() {
    return (
      <Host class="page">
        <portfolio-topbar locale={this.lang} onCmdK={() => (this.cmdkOpen = true)}></portfolio-topbar>
        <portfolio-hero locale={this.lang}></portfolio-hero>
        <portfolio-manifesto locale={this.lang}></portfolio-manifesto>
        <portfolio-stack locale={this.lang}></portfolio-stack>
        <portfolio-ledgb locale={this.lang}></portfolio-ledgb>
        <portfolio-projects locale={this.lang}></portfolio-projects>
        <portfolio-trajectory locale={this.lang}></portfolio-trajectory>
        <portfolio-communication locale={this.lang}></portfolio-communication>
        <portfolio-contact locale={this.lang} onCopyEmail={() => this.copyEmail()}></portfolio-contact>

        <portfolio-cmdk
          locale={this.lang}
          open={this.cmdkOpen}
          onCmdClose={() => (this.cmdkOpen = false)}
          onCmdAction={this.handleCmdAction}
        ></portfolio-cmdk>

        {this.toast && <div class="toast">{this.toast}</div>}
      </Host>
    );
  }
}
