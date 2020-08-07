      const celeste = document.getElementById('celeste')
      const violeta = document.getElementById('violeta')
      const naranja = document.getElementById('naranja')
      const verde = document.getElementById('verde')
      const btnEmpezar = document.getElementById('btnEmpezar')
      const ULTIMO_NIVEL = 10

      class Juego {
        constructor() {
          this.inicializar()
          this.generarSecuencia()
          setTimeout(() => {
            this.siguienteNivel()
          }, 1000);
        }

        inicializar() {
          //this.siguienteNivel = this.siguienteNivel.bind(this)
          this.elegirColor = this.elegirColor.bind(this)
          this.toggleBtnRmpezar()
          this.nivel = 1
          this.colores={
            celeste, violeta, naranja, verde,
          }
        }

        toggleBtnRmpezar(){
          if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
          }else{
            btnEmpezar.classList.add('hide')
          }
        }

        generarSecuencia(){
          this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(el => Math.floor(Math.random() * 4))
        }

        siguienteNivel(){
          this.subnivel=0
          this.iluminarSecuencia()
          this.agregarEventosClick()
        }

        trasnformarNumAcolor(num){
          switch (num) {
            case 0:
              return 'celeste'
            case 1:
              return 'violeta'
            case 2:
              return 'naranja'
            case 3:
              return 'verde'
          }
        }

        trasnformarColorANumero(color){
          switch (color) {
            case 'celeste':
              return 0
            case 'violeta':
              return 1
            case 'naranja':
              return 2
            case 'verde':
              return 3
          }
        }

        iluminarSecuencia(){
          for (let i = 0; i < this.nivel; i++) {
            const color = this.trasnformarNumAcolor(this.secuencia[i])
            setTimeout(() => {
              this.iluminarColor(color)
            }, 1000*i);
          }
        }

        iluminarColor(color){
          this.colores[color].classList.add('light')
          setTimeout(() => {
            this.apagarcolor(color)
          }, 350)
        }

        apagarcolor(nombrecolor){
          this.colores[nombrecolor].classList.remove('light')
        }

        agregarEventosClick(){
          this.colores.celeste.addEventListener('click', this.elegirColor)
          this.colores.verde.addEventListener('click', this.elegirColor)
          this.colores.violeta.addEventListener('click', this.elegirColor)
          this.colores.naranja.addEventListener('click', this.elegirColor)
        }
        eliminarEventosClick(){
          this.colores.celeste.removeEventListener('click', this.elegirColor)
          this.colores.verde.removeEventListener('click', this.elegirColor)
          this.colores.violeta.removeEventListener('click', this.elegirColor)
          this.colores.naranja.removeEventListener('click', this.elegirColor)
        }

        elegirColor(ev){
          const nombreColor = ev.target.dataset.color
          const numeroColor = this.trasnformarColorANumero(nombreColor)
          this.iluminarColor(nombreColor)
          if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.nivel === this.subnivel) {
              this.nivel++
              this.eliminarEventosClick()
              if (this.nivel === (ULTIMO_NIVEL+1)) {
                // Ganó
                this.ganoElJuego()
              }else{
                setTimeout(() => {
                  this.siguienteNivel()
                }, 1500);
              }
            }
          }else{
            // Perdió
            this.perdioElJuego()
          }
        }

        ganoElJuego(){
          swal('SimonColors', 'Felicitaciones, ganaste el juego!', 'success')
          .then(()=>{
                this.eliminarEventosClick()
                this.inicializar()
              })
        }

        perdioElJuego(){
          swal('SimonColors', 'Lo lamentamos, perdiste el juego!', 'error')
              .then(()=>{
                this.eliminarEventosClick()
                this.inicializar()
              })
        }
      }

      function empezarJuego() {
        console.log('empezar juego')
        window.juego = new Juego()
      }