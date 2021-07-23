<template>
  <div class="auth">
    <LoginCompontent></LoginCompontent>
  </div>
</template>

<script>
import LoginCompontent from '@/components/auth.components/LoginCompontent.vue'

export default {
  name: 'Auth',
  components: {
    LoginCompontent
  }
}
</script>

<style scoped lang="scss">
  .auth {
    flex: 1;
    display: flex;
    flex-direction: column;

  }
</style>
