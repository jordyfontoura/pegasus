<template>
  <div>
    <div>
      <div><img src="https://thispersondoesnotexist.com/image" /></div>
      <div>
        <p>Nome: Pedro</p>
        <p>Idade: {{18+Math.floor(Math.random()*30)}}</p>
        <p>E-mail:</p>
      </div>
    </div>
    <div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium
        vero modi ducimus dolore, aliquam fugit, odio ea facilis recusandae
        excepturi cupiditate? Ipsam amet laborum voluptate itaque officiis?
        Fugiat, distinctio quam.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'default',
})
</script>
