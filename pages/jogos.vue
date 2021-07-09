<template>
  <main>
    <div class="jogos" v-if="!emJogo">
      <div class="imagem" @click="jogar"></div>
      <div class="descrição">
        <h2>Jogo sem nome</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis minus
          impedit optio et cupiditate quos rem molestias ipsum adipisci, quae
          sapiente aut, alias laudantium laborum nostrum. Illum labore optio
          eum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, itaque suscipit nesciunt nostrum vel amet mollitia sapiente earum. Quidem distinctio in a iste velit quas placeat vitae nihil incidunt accusamus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure quae cumque quod sapiente voluptatum dolores suscipit exercitationem mollitia natus! Tenetur quisquam ipsam tempora ullam eius assumenda quidem earum dignissimos nemo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum nobis neque tempore eveniet mollitia iusto nesciunt. Dicta voluptatem odit accusantium, facere provident officiis quasi ab ut ad cupiditate iure amet!
        </p>
      </div>
    </div>
    <div class="game" v-else>
      <div>
        <canvas id="game" width="350" height="300" />
      </div>
      <div>
        <button @click="iniciarJogo">Iniciar Jogo</button>
      </div>
    </div>
  </main>
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

<stylel lang="scss">
.jogos{
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  .imagem{
    border-radius: 20px;
    min-width: 500px;
    height: 300px;
    width: 500px;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(https://picsum.photos/500/300);
    @media screen and (max-width: 540px) {
      min-width: 0px;
      width: 100%;

    }
  }
  .descrição{
    min-width: 500px;
    padding: 20px;
    flex: 1;
    @media screen and (max-width: 540px) {
      min-width: 0px;
      width: 100%;
    }
  }
}
.game{
  display: flex;
  align-items: center;
  flex-direction: column;
  #game{
    background-color: black;
    box-shadow: 0 0 20px 2px #000;
    outline: solid 1px;
  }
}
</stylel>
