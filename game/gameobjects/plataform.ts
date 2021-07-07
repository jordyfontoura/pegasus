import { Player } from './player'
import { GameObject } from '~/utils/game'
import { Vetor } from '~/utils/vetor'
import { Tela } from '~/utils/tela'
import { Retangulo } from '~/utils/retangulo'

export class Plataform extends GameObject {
  size = new Vetor(30, 1)
  despertar() {
    this.velocidade = new Vetor(0, -10)

  }

  render(tela: Tela) {
    tela.preencher(new Retangulo(this.posição, this.size))
  }

  // fisica() {
  //   this.posição = this.posição.add(this.velocidade.mul(10 / this.Jogo.fps))
  // }

  tick(){
    this.fisica()
    this.velocidade = this.velocidade.add(0, -1 / this.Jogo.fps)
  }

  emCima(player: Player) {
    if (
      player.posição.x + player.size.x / 2 > this.posição.x - this.size.x / 2 &&
      player.posição.x - player.size.x / 2 < this.posição.x + this.size.x / 2 &&
      this.posição.y - this.size.y / 2 < player.chaoPos.y
    ) {
      return this.posição.y + this.size.y / 2 > player.chaoPos.y - player.size.y
    }
    return false
  }
}
