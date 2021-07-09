/* eslint-disable @typescript-eslint/no-unused-vars */
import { Player } from '../gameobjects/player'
import { Plataform } from '../gameobjects/plataform'
import { UI } from '../gameobjects/ui'
import { Cenario } from '~/utils/cenario'
import { GameEngine } from '~/utils/game'
import { Vetor } from '~/utils/vetor'
import Aleatorizar from '~/utils/random'

export default Cenario.criar('laboratorio', (jogo: GameEngine) => {
  new Player(new Vetor(0, 0))
  new UI(Vetor.Zero)
  new Plataform(new Vetor(0, -50))
  for (let next=Aleatorizar.Int(60, 82), i = 10; i < 10000; i+=next) {
    new Plataform(new Vetor(Aleatorizar.Int(-350/2,350/2), i))
  }
})
