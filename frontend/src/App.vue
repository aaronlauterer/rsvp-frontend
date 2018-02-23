<template>
  <v-app>
    <header id="top">
      <router-link to='/'>
        <img src="@/assets/logo.png" alt="Vroni und Aaron" class="logo">
        </router-link>
      <h1 class="aqua-bg">Zusagen</h1>
    </header>
    <v-content class="content">
      <transition
        name="slide-x-transition"
        mode="out-in">
        <router-view/>
      </transition>
    </v-content>
    <v-footer class="footer">
      <router-link to='/manage'>Manage</router-link>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  name: 'App'
}
</script>

<style lang="scss" scoped>
header#top{
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-family: connoisseursregular;
  font-weight: 300;
  font-size: 80px;
}
.footer {
  background-image: url('assets/handmadepaper.png');
  background-repeat: repeat;
  display: flex;
  justify-content: center;
}
.logo {
  width: 60vw;
  max-width: 300px;
}
.content {
  max-width: 500px;
  margin: 0 auto;
}
</style>

