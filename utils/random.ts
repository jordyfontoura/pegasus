import { Vetor } from './vetor'

const Aleatorizar = {
  /**
   * Retorna um inteiro entre o inicio e o (fim-1)
   * @param inicio Início
   * @param fim Fim exclusivo
   * @returns
   */
  Int(inicio: number, fim: number) {
    return inicio + Math.floor(Math.random() * (fim - inicio))
  },
  Item(lista: any[]) {
    return lista[Aleatorizar.Int(0, lista.length)]
  },
  ids: { default: [] } as Record<string, number[]>,
  Id(group: string = 'default'): number {
    let id
    if (!(group in this.ids)) {
      this.ids[group] = []
    }
    do {
      id = Aleatorizar.Int(1000000, 1000000 * 10)
    } while (this.ids[group].includes(id))
    this.ids[group].push(id)
    return id
  },
  Direção() {
    return Aleatorizar.Item([
      Vetor.Esquerda,
      Vetor.Direita,
      Vetor.Cima,
      Vetor.Baixo,
    ])
  },
  Chance(chance: number): boolean {
    return Math.random() < chance
  },
}
export default Aleatorizar
