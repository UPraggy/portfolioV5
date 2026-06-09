import { Component, h, State, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'intro-button',
  styleUrls: ['my-taypage.css', '../../global/colors.css', '../../global/fonts.css'],
  shadow: true,
})
export class IntroButton {
  @State() showDiv: boolean = false;

  @Prop() playButtonRef?: (el: HTMLDivElement) => void;
  @Prop() onSetchangetext: () => void;

  @Watch('showDiv')
  watchShowDiv(newValue: boolean) {
    
    if (newValue) {
        this.onSetchangetext();
    }
  }

  handleClick = () => {
    this.showDiv = true;
    console.log("AQUI")
  };

  render() {
    return (
      <div
        class="textoIntroBtn animaIntroButton"
        onClick={this.handleClick}
        style={{
          transform: this.showDiv ? 'translateY(-500%)' : 'translateY(0)',
        }}
      >
        <div
          class="button"
          onClick={this.handleClick}
        >
          CLICA AI
        </div>
      </div>
    );
  }
}
