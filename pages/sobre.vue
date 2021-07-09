<template>
  <main>
    <div class="perfil">
      <div class="foto">
        <img src="https://thispersondoesnotexist.com/image" />
      </div>
      <div class="descrição">
        <p>Nome: Ariel</p>
        <p>Idade: {{ 18 + Math.floor(Math.random() * 30) }}</p>
        <p>E-mail: ariel@gmail.com</p>
        <div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium
            vero modi ducimus dolore, aliquam fugit, odio ea facilis recusandae
            excepturi cupiditate? Ipsam amet laborum voluptate itaque officiis?
            Fugiat, distinctio quam.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'default',
})
</script>


<style lang="scss">
.perfil {
  display: flex;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
  .descrição{
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  .foto {
    $size: 300px;
    min-width: $size;
    width: $size;
    height: $size;
    border-radius: 30px;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
