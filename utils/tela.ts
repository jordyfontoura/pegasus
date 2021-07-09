import { GameEngine } from './game'
import { Retangulo } from './retangulo'
import { Vetor } from './vetor'

export class Tela {
  escala: Vetor
  largura: number
  altura: number
  constructor(private game: GameEngine, public ctx: CanvasRenderingContext2D) {
    this.largura = ctx.canvas.width
    this.altura = ctx.canvas.height
    this.escala = new Vetor(1, 1)
  }

  triangulo(posição: Vetor, size: Vetor) {
    this.ctx.beginPath()
    const finalPos = this.toCanvasSpace(posição)
    this.ctx.moveTo(finalPos.x, finalPos.y)
    this.ctx.lineTo(finalPos.x+size.x/2, finalPos.y+3*size.y/2)
    this.ctx.lineTo(finalPos.x-size.x/2, finalPos.y+3*size.y/2)
    this.ctx.fill()
  }

  circulo(posição: Vetor, size: Vetor) {
    this.ctx.beginPath()
    const finalPos = this.toCanvasSpace(posição)
    this.ctx.arc(finalPos.x, finalPos.y+size.y, size.x / 2, 0, 2 * Math.PI)
    this.ctx.fill()
  }


  preencher(retangulo: Retangulo, fillStyle?: string) {
    const tmp = this.ctx.fillStyle
    if (fillStyle) {
      this.ctx.fillStyle = fillStyle
    }
    const x = retangulo.posição.x - retangulo.tamanho.x / 2
    const y = retangulo.posição.y - retangulo.tamanho.y / 2
    const w = retangulo.tamanho.x
    const h = retangulo.tamanho.y
    const finalPos = this.toCanvasSpace(new Vetor(x, y))
    const finalSize = new Vetor(w, h).mul(this.escala)
    this.ctx.fillRect(finalPos.x, finalPos.y, finalSize.x, finalSize.y)
    this.ctx.fillStyle = tmp
  }

  toCanvasSpace(posição: Vetor) {
    return posição
      .mul(1, -1)
      .mul(this.escala)
      .add(this.largura / 2, this.altura / 2)
  }

  toWorldSpace(posição: Vetor) {
    return posição
      .sub(this.largura / 2, this.altura / 2)
      .div(this.escala)
      .mul(1, -1)
  }

  limparTela() {
    this.ctx.clearRect(0, 0, this.largura, this.altura)
  }
}
