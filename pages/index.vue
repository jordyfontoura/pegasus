<template>
  <main>
    <section class="content-only">
      <h1>Lorem ipsum dolor</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia a sequi sint unde voluptatem quod, modi deleniti eum fuga, cupiditate, reprehenderit natus cum facere illo earum labore exercitationem in maxime!</p>
    </section>
    <section>
      <div class="image a"></div>
      <div class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda laudantium quos, corrupti voluptate, ipsum enim laboriosam repellat iusto doloremque ipsa, vitae voluptas distinctio consequuntur id expedita nobis consequatur molestiae suscipit?</div>
    </section>
    <section>
      <div class="image b"></div>
      <div class="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores et fugiat quasi dolore distinctio qui repudiandae fugit totam, aut magnam aliquid maiores nisi asperiores, natus, corporis illo id debitis est?</div>
    </section>
    <section>
      <div class="image c"></div>
      <div class="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda consectetur debitis explicabo eveniet aut quod iusto doloribus velit minus praesentium, quisquam reprehenderit iure et distinctio. Voluptatem, veniam. Veritatis, fugiat et.</div>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>

<style lang="scss">
  .hero{
    height: 92vh;
  }
  main{
    section{
      &.content-only{
        position: absolute;
        width: 100%;
        bottom: 20%;
        height: 52%;
        text-align: center;
        justify-content: space-between;
        p{
          padding: 0 20px;
        }
      }
      height: 92vh;
      display: flex;
      flex-direction: column;
      .image{
        flex: 1;
        display: flex;
        flex-direction: column;
        background-size: cover;
        background-repeat: no-repeat;
        &.a{
          background-image: url(https://b2h3x3f6.stackpathcdn.com/assets/landing/img/gallery/3.jpg);
        }

        &.b{
          background-image: url(https://b2h3x3f6.stackpathcdn.com/assets/landing/img/gallery/2.jpg);
        }
        &.c{
          background-image: url(https://b2h3x3f6.stackpathcdn.com/assets/landing/img/gallery/4.jpg);
        }
      }
      .description{
        padding: 60px 5%;
      }
    }
  }
</style>
