import { GameEngine } from './game'
import Assets from '~/game'


function carregarJogo(canvas: HTMLCanvasElement) {
  const Jogo = GameEngine.criar(canvas)

  Assets.carregar?.(Jogo)
  return Jogo
}
export default carregarJogo
