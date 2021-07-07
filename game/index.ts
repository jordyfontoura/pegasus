import cenarios from './scenes'
import { Cenario } from '~/utils/cenario'
import { GameEngine } from '~/utils/game'

interface IAssets {
  cenarios: Cenario[]
  carregar(jogo: GameEngine): void
}

const Assets: IAssets = {
  cenarios,
  carregar() {},
}
export default Assets
