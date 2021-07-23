<template>
  <h1>
    TODO Authorization 
  </h1>

  <div class="todo-login-container">
    <form class="login-form" action="" method="post">

      <input type="text" name="login" placeholder="Login"/>
      <input type="password" name="password" placeholder="Password"/>

      <button class="button-login">Login</button>
    </form>
    
  </div>
</template>

<script>
export default {
  name: 'LoginCompontent'
}
</script>

<style scoped lang="scss" src="@/assets/scss/auth/login-component.scss"></style>