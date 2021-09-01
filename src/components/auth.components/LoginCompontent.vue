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

    <div class="message message-error hide" ref="auth-error-message" @click='hideMessage("auth-error-message")'>Incorrect login or password!</div>
    
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
    loginMethod() {
      const {login, password} = this
      this.$store.dispatch(AUTH_LOGIN, { login, password }).then(() => {
        this.$router.push({ name: 'Main' })
      }).catch(error => {
        if (error.response.status == 403) {
          this.$refs["auth-error-message"].classList.remove("hide")
        }
      })
    },

    hideMessage(refName) {
      let node = this.$refs[refName]
      node.classList.add("hide")
    },
  }
}
</script>

<style scoped lang="scss" src="@/assets/scss/auth/login-component.scss"></style>