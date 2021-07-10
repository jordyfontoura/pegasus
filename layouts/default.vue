<template>
  <div id="app">
    <div class="menu-space">
      <nav class="menu">
        <ul class="menu-list">
          <li>
            <NuxtLink to="/">Início</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/jogos">Jogos</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/sobre">Sobre</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <header class="hero cabeçalho">
      <img
        src="https://images.vexels.com/media/users/3/215356/isolated/preview/7c6f4b5d275927d3dec64f6bb49f1e71-joystick-plano-de-controle-de-jogos.png"
      />
    </header>
    <Nuxt />
    <footer class="rodape">
      <h4>Jordy Fontoura</h4>
    </footer>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');
html,
body,
#__nuxt,
#__layout,
#app {
  margin: 0;
  min-height: 100vh;
  width: 100%;
  color: #fff;
}
#app {
  background-color: #141414;
  font-family: 'Roboto';
}
.menu-space {
  height: 8vh;
}
.cabeçalho {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 30%;
    opacity: 60%;
  }
}
.rodape {
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 0px 20px;
  margin-top: 20vh;
}
.menu {
  position: fixed;
  width: 100%;
  box-shadow: inset 0px 60px 10px -20px #141414;
  height: 8vh;
  // background-color: #ffffff;
  a {
    color: #fff;
    text-decoration: none;
    &.nuxt-link-exact-active {
      text-decoration: underline 2px;
    }
  }
  &-list {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    list-style: none;
    padding: 12px;
    li {
      margin: 0 12px;
    }
  }
}
</style>
