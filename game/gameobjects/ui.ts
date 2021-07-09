import { Player } from './player'
import { GameObject } from '~/utils/game'
import { Tela } from '~/utils/tela'

export class UI extends GameObject {
  pontuação = 0
  tick() {
    const player = this.Jogo.gameObjects.find(
      (o) => o instanceof Player
    ) as Player
    if (!player) {
      return
    }
    this.pontuação = player.pontuação
  }

  render(tela: Tela) {
    const pontuação = `Pontuação: ${
      Math.floor(this.pontuação).toPrecision(100).split('.')[0]
    }`
    tela.ctx.fillText(pontuação, 350 - 6 * pontuação.length, 20)
  }
}
