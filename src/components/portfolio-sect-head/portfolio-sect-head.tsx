import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'portfolio-sect-head',
  shadow: false,
})
export class PortfolioSectHead {
  @Prop() num: string = '';
  @Prop() titleHtml: string = '';
  @Prop() sub: string = '';

  render() {
    return (
      <div class="sect-head">
        <div class="num">{this.num}</div>
        <h2 innerHTML={this.titleHtml}></h2>
        {this.sub && <div class="sub">{this.sub}</div>}
      </div>
    );
  }
}
