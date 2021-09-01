<template>
  <div class="nav">
    <div class="right-nav">
      <button @click="logoutMethod" class="logout-link">
        Logout
      </button>
    </div>
  </div>
  <div class="main">
    <MainComponent></MainComponent>
  </div>
</template>

<script>
import MainComponent from '@/components/main.components/MainComponent.vue'
import { AUTH_LOGOUT } from '@/store/actions/auth'

export default {
  name: 'Main',
  components: {
    MainComponent
  },
  methods: {
    logoutMethod: function () {
      this.$store.dispatch(AUTH_LOGOUT)
      .then(() => {
        this.$router.push({ name: 'Login' })
      })
    }
  }
}
</script>

<style lang="scss" src="@/assets/scss/main/main.scss">
</style>



