import { GameEngine } from './game'

export class Cenario {
  static cenarios: Record<string, Cenario> = {}
  carregar: (jogo: GameEngine) => void
  constructor(public nome: string, loader: (jogo: GameEngine) => void) {
    this.carregar = loader
    console.log(`Cenário ${nome} criado!`)
    Cenario.cenarios[nome] = this
  }

  static criar(nome: string, scene: (jogo: GameEngine) => void) {
    return new Cenario(nome, scene)
  }
}
