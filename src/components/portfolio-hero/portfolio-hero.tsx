import { Component, h, Prop } from '@stencil/core';
import { RAFAEL, Lang, T, tx } from '../../utils/data';

@Component({
  tag: 'portfolio-hero',
  shadow: false,
})
export class PortfolioHero {
  @Prop() locale: Lang = 'pt';

  render() {
    const L = this.locale;
    return (
      <section class="hero wrap" id="top">
        <div class="hero-meta">
          <span>{RAFAEL.location}</span>
          <span>{RAFAEL.timezone}</span>
          <span class="live">{tx(RAFAEL.status, L)}</span>
          <span>v5 · 2026</span>
        </div>
        <h1>
          <span>Rafael</span>{' '}
          <span class="it">Moreira</span>{' '}
          <span class="amp">&amp;</span>
          <br />
          <span>Ramos</span>{' '}
          <span>de Rezende</span>
        </h1>
        <div class="hero-grid">
          <div class="hero-tagline-col">
            <div class="hero-tagline">
              {L === 'pt' ? (
                <span>Construo o <em>ambiente inteiro</em> — código, servidor, rede e tudo entre os dois.</span>
              ) : (
                <span>I build the <em>whole environment</em> — code, server, network, everything in between.</span>
              )}
            </div>
            <div class="hero-disc" aria-hidden="true">
              <span>DEV</span><span>DESIGN</span><span>INFRA</span><span>COMUNICAÇÃO</span>
            </div>
          </div>
          <div class="hero-stats">
            <div>
              <div class="lbl">{tx(T.hero.roleLabel, L)}</div>
              <div class="val">{tx(T.hero.roleVal, L)}</div>
            </div>
            <div>
              <div class="lbl">{tx(T.hero.companyLabel, L)}</div>
              <div class="val">{tx(T.hero.companyVal, L)}</div>
            </div>
            <div>
              <div class="lbl">{tx(T.hero.projectLabel, L)}</div>
              <div class="val"><a href="#ledgb">LEDGB Orchestrator ↗</a></div>
            </div>
            <div>
              <div class="lbl">{tx(T.hero.sinceLabel, L)}</div>
              <div class="val">Fev/2020</div>
            </div>
          </div>
        </div>
        <div class="scroll-cue">
          <span>SCROLL</span>
          <span class="line"></span>
          <span>{tx(T.hero.scrollNote, L)}</span>
        </div>
      </section>
    );
  }
}
