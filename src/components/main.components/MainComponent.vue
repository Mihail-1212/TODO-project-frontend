<template>
  <h1>
    TODO application 
  </h1>
  <div class="todo-main-container">
    <button class="add-event-button">Add new event</button>
    <ul class="todo-body-container">
      <li class="todo-item-container">
        <div class="name">
          Выйти наружу

          <div class="date">
            10.05.2021 (01:40)
          </div>
        </div>
        <div class="description">
          Описание
        </div>
        
        <i class="delete-button far fa-trash-alt"></i>
        
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainComponent',
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.axios.get('https://jsonplaceholder.typicode.com/users')
      .then(data => this.users = data.data)
      .catch(error => console.log(error))
    
  }
}
</script>

<style scoped lang="scss" src="@/assets/scss/main/main-component.scss">
</style>

