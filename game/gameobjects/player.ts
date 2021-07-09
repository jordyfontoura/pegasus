import { Plataform } from './plataform'
import { GameObject } from '~/utils/game'
import { Vetor } from '~/utils/vetor'
import { Tela } from '~/utils/tela'
import { Retangulo } from '~/utils/retangulo'
import { cooldown } from '~/utils/tempo'
import Aleatorizar from '~/utils/random'

export class Player extends GameObject {
  size = new Vetor(10, 10)
  pontuação: number = 0
  input: Record<string, number> = {}
  horizontalSpeed = 200
  podeSaltar = false
  saltando = false
  saltoCooldown = cooldown(500)
  chaoCooldown = cooldown(400)
  forma = 0
  formas = [
    (tela: Tela) => {
      tela.triangulo(this.posição, this.size)
    },
    (tela: Tela) => {
      tela.circulo(this.posição, this.size)
    },
    (tela: Tela) => {
      tela.preencher(
        new Retangulo(
          this.posição.add(0, (this.size.y * 3) / 2),
          this.size.add(0, this.size.y)
        )
      )
    },
    (tela: Tela) => {
      tela.preencher(new Retangulo(this.posição, this.size))
    },
  ]

  get centro() {
    return this.posição.add(new Vetor(this.size.x, this.size.y).div(2))
  }

  get chaoPos() {
    return this.posição.add(new Vetor(0, -this.size.y / 2))
  }

  quandoDestruir() {
    this.Jogo.pausar()
    setTimeout(() => {
      this.Jogo.parar()
      setTimeout(()=>{

        this.Jogo.iniciar()
      }, 100)
    }, 2000)
  }

  despertar() {
    document.addEventListener('keydown', (ev) => {
      if (!this.input[ev.key]) {
        this.input[ev.key] = 1
      }
    })
    document.addEventListener('keyup', (ev) => {
      this.input[ev.key] = 0
    })
    document.addEventListener('mousedown', (ev) => {
      console.log(ev, this.posição.toString())
      const mouse = new Vetor(ev.x, ev.y)
      const canvas = this.Jogo.tela.ctx.canvas
      const distancia = mouse
        .sub(canvas.offsetLeft, canvas.offsetTop)
        .sub(canvas.width / 2, canvas.height / 2)
        .mul(1, -1)
        .sub(this.posição.sub(0, this.size.y)).magnitude
      console.log({ distancia })
      if (distancia < 10) {
        this.click()
      }
    })
  }

  click() {
    this.forma = Aleatorizar.Item(
      this.formas.map((_, i) => i).filter((i) => i !== this.forma)
    )
  }

  inputs() {
    for (const key in this.input) {
      if (Object.prototype.hasOwnProperty.call(this.input, key)) {
        if (this.input[key] === 1) {
          this.input[key] = 2
        }
      }
    }
  }

  tick() {
    this.pontuação += 1 / (this.Jogo.fps * 10)
    if (this.posição.x > 350 / 2) {
      this.posição = new Vetor(
        (this.posição.x % (350 / 2)) - 350 / 2,
        this.posição.y
      )
    }
    if (this.posição.x < -350 / 2) {
      this.posição = new Vetor(
        350 / 2 - (this.posição.x % (350 / 2)),
        this.posição.y
      )
    }
    if (this.input['w'] === 1 && this.podeSaltar && !this.saltando) {
      this.saltando = true
      this.velocidade = this.velocidade.add(new Vetor(0, 4000 / 30))
    }
    if (this.velocidade.y <= 0) {
      this.saltando = false
    }
    if (this.input['d'] && this.velocidade.x < this.horizontalSpeed) {
      this.velocidade = this.velocidade.add(
        new Vetor(this.horizontalSpeed / (this.Jogo.fps / 2), 0)
      )
    }
    if (this.input['a'] && this.velocidade.x > -this.horizontalSpeed) {
      this.velocidade = this.velocidade.sub(
        new Vetor(this.horizontalSpeed / (this.Jogo.fps / 2), 0)
      )
    }
    this.fisica()
    this.gravidade()
    this.drag()
    this.inputs()
    if (this.posição.y - (3 * this.size.y) / 2 <= -150) {
      this.destruir()
      console.log('EndGame')
    }
  }

  render(tela: Tela) {
    this.formas[this.forma](tela)

    // tela.ctx.font = '10px sans-se'
    // const pontuação = `Pontuação: ${
    //   Math.floor(this.pontuação).toPrecision(100).split('.')[0]
    // }`
    // tela.ctx.fillText(pontuação, 350 - 6 * pontuação.length, 20)
    // tela.fillRect(this.posição.x-this.size.x/2, this.posição.y-this.size.y/2, this.size.x, this.size.y)
    // tela.fillRect(this.posição.x, this.posição.y, this.size.x, this.size.y)
  }

  gravidade() {
    const plataform = this.Jogo.gameObjects.find((go) =>
      go instanceof Plataform ? go.emCima(this) : false
    )
    if (plataform) {
      this.podeSaltar = true
      this.chaoCooldown.start()
      if (this.velocidade.y < 0)
        this.velocidade = this.velocidade.mul(1, 0).add(plataform.velocidade)
      return
    }
    this.podeSaltar = this.chaoCooldown.cooldown() ? false : this.podeSaltar
    this.velocidade = this.velocidade.sub(new Vetor(0, 100 / this.Jogo.fps))
  }

  drag() {
    if (this.podeSaltar) {
      this.velocidade = this.velocidade.mul(1 - 0.1, 1)
    }
  }
}
