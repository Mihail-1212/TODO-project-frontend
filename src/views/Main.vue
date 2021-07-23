<template>
  <div class="nav">
    <div class="right-nav">
      <router-link class="logout-link" :to="{
        name: 'Logout'
      }">
        Logout
      </router-link>
    </div>
  </div>
  <div class="main">
    <MainComponent></MainComponent>
  </div>
</template>

<script>
import MainComponent from '@/components/main.components/MainComponent.vue'

export default {
  name: 'Main',
  components: {
    MainComponent
  }
}
</script>

<style lang="scss" src="@/assets/scss/main/main.scss">
</style>



