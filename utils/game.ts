import { Cenario } from './cenario'
import Aleatorizar from './random'
import { Tela } from './tela'
import { esperar } from './tempo'
import { Vetor } from './vetor'

export abstract class GameObject {
  posição: Vetor
  id: number
  zIndex: number = 0
  velocidade: Vetor = Vetor.Zero
  get Jogo() {
    return Jogo
  }

  constructor(position: Vetor = Vetor.Zero) {
    if (!Jogo) {
      throw new Error(
        'Você deve criar uma instância de GameEngine primeiro. Tente usar GameEngine.novo() antes de criar objetos do jogo.'
      )
    }
    this.id = Aleatorizar.Id('GameObject')
    this.posição = position
    GameEngine.instanciar(this)
  }

  despertar?(): void
  tick?(): void
  render?(tela: Tela): void
  quandoDestruir?(): void
  destruir(force = false) {
    return GameEngine.destruir(this, force)
  }

  fisica() {
    this.posição = this.posição.add(this.velocidade.mul(1 / this.Jogo.fps))
  }
}

export class GameEngine {
  estado: 'rodando' | 'pausado' | 'parado' = 'parado'
  ticks: number = 0
  fps = 60
  gameObjects: GameObject[] = []
  tela: Tela

  private constructor(private canvas: HTMLCanvasElement) {
    this.tela = new Tela(
      this,
      canvas.getContext('2d') as CanvasRenderingContext2D
    )
    this.tela.ctx.fillStyle="white"
  }

  static criar(canvas: HTMLCanvasElement) {
    if (!Jogo) {
      Jogo = new GameEngine(canvas)
    }
    return Jogo
  }

  pausar() {
    this.estado = 'pausado'
  }

  parar() {
    this.estado = 'parado'
  }

  iniciar(cenario?: string) {
    this.estado = 'rodando'
    this.ticks = 0
    console.log(`Jogo iniciado!`)
    if (!Object.values(Cenario.cenarios).length)
      throw new Error('Nenhum cenário foi criado!')
    Cenario.cenarios[cenario || Object.keys(Cenario.cenarios)[0]].carregar(this)
    return this.loop()
  }

  private async loop() {
    while (this.estado !== 'parado') {
      if (this.estado === 'rodando') {
        this.tick()
      }
      this.render()
      await esperar(1000 / this.fps)
    }
    this.encerrar()
  }

  private tick() {
    this.gameObjects.forEach((gameObject) => gameObject.tick?.())
    this.ticks++
  }

  private encerrar() {
    console.log('Encerrando jogo...')
    this.gameObjects.map((o) => o.destruir(true))

    this.gameObjects = []
    this.limparTela()
    console.log('Jogo encerrado')
  }

  private render() {
    this.limparTela()
    this.gameObjects.forEach((gameObject) => gameObject.render?.(this.tela))
  }

  static instanciar<T extends GameObject>(gameObject: T): T {
    Jogo.gameObjects.push(gameObject)
    gameObject.despertar?.()
    return gameObject
  }

  static destruir<T extends GameObject>(
    gameObject: T,
    force: boolean = false
  ): boolean {
    if (force) {
      const index = Jogo.gameObjects.findIndex((o) => o.id === gameObject.id)
      if (index < 0) {
        console.warn(`Falha ao destruir GameObject[${gameObject.id}]`)
        return false
      }
      Jogo.gameObjects.splice(index, 1)
      return true
    }
    const index = Jogo.gameObjects.findIndex((o) => o.id === gameObject.id)
    if (index < 0) {
      console.warn(`Falha ao destruir GameObject[${gameObject.id}]`)
      return false
    }
    gameObject.quandoDestruir?.()
    Jogo.gameObjects.splice(index, 1)
    return true
  }

  limparTela() {
    this.tela.limparTela()
  }

  toCanvasSpace(posição: Vetor) {
    return this.tela.toCanvasSpace(posição)
  }

  toWorldSpace(posição: Vetor) {
    return this.tela.toWorldSpace(posição)
  }
}
let Jogo: GameEngine
