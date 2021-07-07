import { Plataform } from './plataform'
import { GameObject } from '~/utils/game'
import { Vetor } from '~/utils/vetor'
import { Tela } from '~/utils/tela'
import { Retangulo } from '~/utils/retangulo'
import { cooldown } from '~/utils/tempo'

export class Player extends GameObject {
  size = new Vetor(10, 10)
  input: Record<string, number> = {}
  horizontalSpeed = 200
  podeSaltar = false
  saltando = false
  saltoCooldown = cooldown(500)
  chaoCooldown = cooldown(400)
  get centro() {
    return this.posição.add(new Vetor(this.size.x, this.size.y).div(2))
  }

  get chaoPos() {
    return this.posição.add(new Vetor(0, -this.size.y / 2))
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
      this.velocidade = this.velocidade.add(new Vetor(this.horizontalSpeed / (this.Jogo.fps/2), 0))
    }
    if (this.input['a'] && this.velocidade.x > -this.horizontalSpeed) {
      this.velocidade = this.velocidade.sub(new Vetor(this.horizontalSpeed / (this.Jogo.fps/2), 0))
    }
    this.fisica()
    this.gravidade()
    this.drag()
    this.inputs()
  }

  render(tela: Tela) {
    tela.preencher(new Retangulo(this.posição, this.size))
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
      if (this.velocidade.y < 0) this.velocidade = this.velocidade.mul(1, 0).add(plataform.velocidade)
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
