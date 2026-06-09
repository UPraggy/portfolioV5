import { Component, Element, Host, State, h } from '@stencil/core';
import { taypageStaticObject } from './my-taypage-objects';

@Component({
  tag: 'my-taypage',
  styleUrls: ['./my-taypage.css', '../../global/colors.css', '../../global/fonts.css'],
  shadow: true,
})
export class MyTaypage {

  @State() tempoDecorrido = this.calcularTempoRestante("2024-10-18T22:00:00")
  @State() tempoDecorridoNamoro = this.calcularTempoRestante("2024-12-08T22:00:00")

  @State() slideController: number = 0;
  @State() changeText: number = 0;
  @State() changeAnimation: string = '';
  @State() changeAnimation2: string = '';

  @State() windowSize: { width: number; height: number } = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // sequência inicial
  @State() initialSequenceIndex: number = 1;
  @State() finishedInitialSequence: boolean = false;

  private intervalo1: any;
  private intervalo2: any;
  private sliderTimeout: any;
  private intervaloTexto: any;

  private imagesCountMax: number = 50;
  private imagesArr: any = Array.from({ length: 50 }, (_, i) => `${i + 1}.jpg`);

  @Element() el: HTMLElement;
  audioRef: HTMLAudioElement;

  private taypageListObj = (new taypageStaticObject).taypageListObj
  @State() changeTextList: number = 0;

  handleNextRandomText = () => {
    const maxIndex = this.taypageListObj.length;
    const randomIndex = Math.floor(Math.random() * maxIndex);
    this.changeTextList = randomIndex;
  }

  calcularTempoRestante(dataInicial) {
    const agora: Date = new Date();
    const alvo: Date = new Date(dataInicial);

    if (agora < alvo) {
      return { anos: 0, meses: 0, dias: 0, horas: 0, minutos: 0, segundos: 0 };
    }

    let anos = agora.getFullYear() - alvo.getFullYear();
    let meses = agora.getMonth() - alvo.getMonth();
    let dias = agora.getDate() - alvo.getDate();

    if (meses < 0) {
      anos -= 1;
      meses += 12;
    }

    if (dias < 0) {
      const ultimoDiaMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
      dias += ultimoDiaMesAnterior;
      meses -= 1;

      if (meses < 0) {
        anos -= 1;
        meses += 12;
      }
    }

    const diferenca = agora.getTime() - alvo.getTime();
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    const segundos = Math.floor((diferenca / 1000) % 60);

    return { anos, meses, dias, horas, minutos, segundos };
  }

  // 🔥 SLIDER CONTROLADO COM TIMEOUT
  startSlider = () => {
    this.sliderTimeout = setTimeout(() => {

      if (this.changeText === 1) {

        // sequência inicial (2 → 6)
        if (!this.finishedInitialSequence) {
          this.slideController = this.initialSequenceIndex;
          this.initialSequenceIndex++;

          if (this.initialSequenceIndex > 5) {
            this.finishedInitialSequence = true;
          }

        } else {
          // aleatório
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * this.imagesCountMax);
          } while (randomIndex === this.slideController);

          this.slideController = randomIndex;
        }
      }

      // chama de novo (loop controlado)
      this.startSlider();

    }, 3000);
  };

  // 👆 clique manual
  handleNextImage = () => {

    // sai da sequência inicial
    if (!this.finishedInitialSequence) {
      this.finishedInitialSequence = true;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.imagesCountMax);
    } while (randomIndex === this.slideController);

    this.slideController = randomIndex;

    // 🔁 RESET DO TEMPO
    clearTimeout(this.sliderTimeout);
    this.startSlider();
  };

  componentWillLoad() {

    this.intervalo1 = setInterval(() => {
      this.tempoDecorrido = this.calcularTempoRestante("2024-10-18T22:00:00");
    }, 1000);

    this.intervalo2 = setInterval(() => {
      this.tempoDecorridoNamoro = this.calcularTempoRestante("2024-12-08T22:00:00");
    }, 1000);

    this.startSlider();

    this.intervaloTexto = setInterval(() => {
      if (this.changeText === 1) {
        this.handleNextRandomText();
      }
    }, 5000);
  }

  componentDidUpdate() {
    if (this.changeText === 1) {
      setTimeout(() => { this.changeAnimation = 'animaText'; }, 2000);
      setTimeout(() => { this.changeAnimation2 = 'animaText'; }, 2300);
    }
  }

  disconnectedCallback() {
    clearInterval(this.intervalo1);
    clearInterval(this.intervalo2);
    clearTimeout(this.sliderTimeout);
    clearInterval(this.intervaloTexto);
  }

  handlePlay = () => {
    this.audioRef?.play();
  };

  setChangeText = (val: number) => {
    this.changeText = val;
    this.handlePlay();
  };


  
  render() {
    return (
      <Host>
        <slot>
        
         <div class={`containerPrincipalTay TayPageTempo ${this.changeText === 0 ? 'introBtn' : ''}`}>
         <audio
          ref={el => (this.audioRef = el)}
          controls
          preload="auto"
          style={{ opacity: '0', height: '0' }}
        >
          <source src="/portifoliov4/static/audio/SouTodoLoveLove.mp3" type="audio/mp3" />
          Seu navegador não suporta a tag de áudio.
        </audio>

        { this.changeText === 0   ?  <intro-button
            onSetchangetext={() => {
              this.audioRef?.play();
              this.setChangeText(1)
            }}
          /> : 
        <div>
        

              <div class={`heartsInitial ${this.changeAnimation2}`}>
                <div class="heart" style={{'--hearth-rotate': '70deg', '--hearth-size': this.windowSize.width > 767 ? '30%' : '70%', 
                  '--topPos': this.windowSize.width > 767 ? '25%' : '45%', '--leftPos': this.windowSize.width > 767 ? '35%' : '9%',
                  '--hearth-colorTMP': '#FB6A78'}}></div>
                <div class="heart" style={{'--hearth-rotate': '179deg', '--hearth-size': this.windowSize.width > 767 ? '44%' : '44%', 
                  '--topPos': this.windowSize.width > 767 ? '0%' : '-12%', '--leftPos': this.windowSize.width > 767 ? '-16%' : '-29%',
                  '--hearth-colorTMP': '#F70820'}}></div>
                <div class="heart" style={{'--hearth-rotate': '280deg', '--hearth-size': this.windowSize.width > 767 ? '30%' : '44%', 
                  '--topPos': this.windowSize.width > 767 ? '25%' : '-8%', '--leftPos': this.windowSize.width > 767 ? '35%' : '87%',
                  '--hearth-colorTMP': '#F70820'}}></div>
                <div class="heart" style={{'--hearth-rotate': '395deg', '--hearth-size': this.windowSize.width > 767 ? '30%' : '29%', 
                  '--topPos': this.windowSize.width > 767 ? '27%' : '23%', '--leftPos': this.windowSize.width > 767 ? '35%' : '5%',
                  '--hearth-colorTMP': '#F9394C'}}></div>
                <div class="heart" style={{'--hearth-rotate': '385deg', '--hearth-size': this.windowSize.width > 767 ? '30%' : '25%', 
                  '--topPos': this.windowSize.width > 767 ? '385%' : '22%', '--leftPos': this.windowSize.width > 767 ? '35%' : '69%',
                  '--hearth-colorTMP': '#F9394C', zIndex: '32'}}></div>
                <div class="heart" style={{'--hearth-rotate': '385deg', '--hearth-size': this.windowSize.width > 767 ? '30%' : '25%', 
                  '--topPos': this.windowSize.width > 767 ? '25%' : '73%', '--leftPos': this.windowSize.width > 767 ? '35%' : '9%',
                  '--hearth-colorTMP': '#F70820'}}></div>

                <div class="heart" style={{'--hearth-rotate': '385deg', '--hearth-size': this.windowSize.width > 767 ? '30%' : '28%', 
                  '--topPos': this.windowSize.width > 767 ? '25%' : '75%', '--leftPos': this.windowSize.width > 767 ? '35%' : '73%',
                  '--hearth-colorTMP': '#F9394C', zIndex: '32'}}></div>

                {/* <div class="heart" style={{'--hearth-rotate': '70deg', '--hearth-size': this.windowSize.width > 767 ? '30%' : '90%', 
                  '--topPos': this.windowSize.width > 767 ? '25%' : '-100%', '--leftPos': this.windowSize.width > 767 ? '35%' : '5%',
                  '--hearth-colorTMP': '#F70820'}}></div>
                <div class="heart" style={{'--hearth-rotate': '70deg', '--hearth-size': this.windowSize.width > 767 ? '30%' : '90%', 
                  '--topPos': this.windowSize.width > 767 ? '25%' : '-100%', '--leftPos': this.windowSize.width > 767 ? '35%' : '5%',
                  '--hearth-colorTMP': '#F70820'}}></div> */}
              </div>
            <div class={`title ${this.changeAnimation}`}>Que o nosso amor seja eterno e nossas memórias não se percam com o tempo e jamais se limite a apenas palavras</div>

            <div class={`leftContainer ${this.changeAnimation2}`}>
                    <div class="imageSlider" style={{'--imageTay': `url('/portifoliov4/static/imgs/taynaraContador/${this.imagesArr[this.slideController]}?v=${10}')`}}
                    onClick={() => this.handleNextImage()}></div>

                </div>

            { this.changeAnimation2 !== '' ? <div>
            
            <div class="subtext">
               Quem diria que seria tão difícil falar sobre o tempo, sendo que juntos o tempo muda sua maneira de contar,
              passando de uma maneira tão rápida e difícil de acompanhar. Sei que perto da eternidade, apenas aquele que 
              nos uniu e a tudo governa tem o controle sobre. Mas se posso pedir algo, eu desejo que o nosso amor seja bom e perfeito
              enquanto dure, e que nem o tempo, a distância, ou as dificuldades da vida nos separe.

              Esse site eu dedico ao nosso amor, que pode não ser infinito, mas também nunca passará na minha mente como algo finito. 
            </div>

            <div class="subtitle ">Oficialmente Juntos há:</div>
            
            <div class="temporizador ">

              <div class="countBox">
                <div>{this.tempoDecorridoNamoro.anos}</div>
                <div>anos</div>
              </div>

              <div class="countBox">
                <div>{this.tempoDecorridoNamoro.meses}</div>
                <div>meses</div>
              </div>

              <div class="countBox">
                <div>{this.tempoDecorridoNamoro.dias}</div>
                <div>dias</div>
              </div>

              <div class="countBox">
                <div>{this.tempoDecorridoNamoro.horas}</div>
                <div>horas</div>
              </div>

              <div class="countBox">
                <div>{this.tempoDecorridoNamoro.minutos}</div>
                <div>minutos</div>
              </div>

              <div class="countBox">
                <div>{this.tempoDecorridoNamoro.segundos}</div>
                <div>segundos</div>
              </div>

            </div>


            <div class="subtitle conheceu">Juntos há:</div>
            
            <div class="temporizador conheceu">

              <div class="countBox">
                <div>{this.tempoDecorrido.anos}</div>
                <div>anos</div>
              </div>

              <div class="countBox">
                <div>{this.tempoDecorrido.meses}</div>
                <div>meses</div>
              </div>

              <div class="countBox">
                <div>{this.tempoDecorrido.dias}</div>
                <div>dias</div>
              </div>

              <div class="countBox">
                <div>{this.tempoDecorrido.horas}</div>
                <div>horas</div>
              </div>

              <div class="countBox">
                <div>{this.tempoDecorrido.minutos}</div>
                <div>minutos</div>
              </div>

              <div class="countBox">
                <div>{this.tempoDecorrido.segundos}</div>
                <div>segundos</div>
              </div>

            </div> 
            
            
            <div class="porqueamar">
              <div class="titlePq">Porque te amar</div>
              <div class="fraseAleatoria">{this.taypageListObj[this.changeTextList].text}</div>
              <div class="proximo" onClick={() => this.handleNextRandomText()}>Mais+</div>
            </div>

            <div class="skyImageEncontros">
              <div class="titleSy">Céu no dia em que tudo começou</div>
              <div class="skyimg"></div>
            </div>
            
            </div> : <div></div> }  </div>}

        </div> 

        </slot>
      </Host>
    );
  }
}






