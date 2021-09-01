<template>
  <h1>
    TODO Authorization 
  </h1>

  <div class="todo-login-container">
    <form class="login-form" @submit.prevent="loginMethod">

      <input type="text" v-model="login" placeholder="Login"/>
      <input type="password" v-model="password" placeholder="Password"/>

      <button class="button-login" type="submit">Login</button>
    </form>
    
  </div>
</template>

<script>
import { AUTH_LOGIN } from '@/store/actions/auth'

export default {
  name: 'LoginCompontent',
  data() {
    return {
      login: "",
      password: "",
    }
  },
  methods: {
    loginMethod: function() {
      const {login, password} = this
      this.$store.dispatch(AUTH_LOGIN, { login, password }).then(() => {
        this.$router.push({ name: 'Main' })
      })
    }
  }
}
</script>

<style scoped lang="scss" src="@/assets/scss/auth/login-component.scss"></style>