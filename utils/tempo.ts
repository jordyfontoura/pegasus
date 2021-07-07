export function esperar(ms: number) {
  if (ms <= 0) {
    return
  }
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export function cooldown(intervalo: number){
  return {
    started: 0,
    intervalo,
    start(){
      this.started = Date.now()
    },
    cooldown(){
      return Date.now() > this.started+this.intervalo
    }
  }
}
