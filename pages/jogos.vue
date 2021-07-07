<template>
  <div>
    <div v-if="!emJogo">
      <div><img @click="jogar" src="https://picsum.photos/200" /></div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis minus
          impedit optio et cupiditate quos rem molestias ipsum adipisci, quae
          sapiente aut, alias laudantium laborum nostrum. Illum labore optio
          eum!
        </p>
      </div>
    </div>
    <div v-else>
      <div>
        <canvas id="game" width="350" height="300" />
      </div>
      <div>
        <button @click="iniciarJogo">Iniciar Jogo</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GameEngine } from '~/utils/game'
import carregarJogo from '~/utils'

export default Vue.extend({
  data() {
    return {
      game: null as GameEngine | null,
      emJogo: false,
    }
  },
  mounted() {},
  updated() {
    if (this.emJogo && !this.game) {
      const canvas = document.getElementById('game') as HTMLCanvasElement
      if (!canvas) return
      this.game = carregarJogo(canvas)
    }
  },
  methods: {
    jogar() {
      this.emJogo = true
    },
    iniciarJogo() {
      if (!this.game) return
      this.game.iniciar()
    },
  },
})
</script>

<style>
</style>
