<template>
  <h1>
    TODO application 
  </h1>
  <div class="todo-main-container">

    <button class="add-event-button" @click="showAddEventPopup()">Add new event</button>

    <form @submit.prevent="addNewEvent">
      <PopupComponent ref="addEventPopup" class="popup-component">
        <template v-slot:header>
          <h1>Add new event</h1>
        </template>

        <template v-slot:body>
          <div class="form-body">
            <div>
              <label>Name</label>
              <input v-model="newName" type="text">
            </div>
            <div>
              <label>Description</label>
              <input v-model="newDescription" type="text">
            </div>
            <div>
              <label>Date</label>
              <input v-model="newDate" type="date">
            </div>
            <div>
              <label>Time</label>
              <input v-model="newTime" type="time">
            </div>
          </div>
        </template>

        <template v-slot:footer>
          <button type="submit">Add new event</button>
        </template>
      </PopupComponent>
    </form>

    <form @submit.prevent="updateEvent">
      <PopupComponent ref="updateEventPopup" class="popup-component">
        <template v-slot:header>
          <h1>Update Event</h1>
        </template>

        <template v-slot:body>
          <div class="form-body">
            <div>
              <label>Name</label>
              <input v-model="updateTask.name" type="text">
            </div>
            <div>
              <label>Description</label>
              <input v-model="updateTask.description" type="text">
            </div>
            <div>
              <label>Date</label>
              <input v-model="_updateTaskDate" type="date">
            </div>
            <div>
              <label>Time</label>
              <input v-model="_updateTaskTime" type="time">
            </div>
          </div>
        </template>

        <template v-slot:footer>
          <button type="submit">Update event</button>
        </template>

      </PopupComponent>
    </form>

    <ul class="todo-body-container">
      <li class="todo-item-container" v-for="task in tasks" :key="task.id">

        <div class="name">
          {{ task.name }}
          <div class="date">
            {{ formatDateTime(task, "DD.MM.YYYY (hh:mm)") }}
          </div>
        </div>
        <div class="description">
          {{ task.description }}
        </div>

        <i class="todo-button update-button far fa-undo-alt" @click="showUpdateEventPopup(task)"></i>
        
        <i class="todo-button delete-button far fa-trash-alt" @click="deleteTask(task)"></i>
        
      </li>
    </ul>
  </div>
</template>

<script>

import {
  TASKS_GET,
  TASK_CREATE,
  TASK_DELETE,
  TASK_UPDATE,
} from "@/store/actions/task"
import {
  HTTP_ERROR
} from "@/store/actions/utils"
import moment from 'moment'
import PopupComponent from '@/components/popup.components/PopupComponent.vue'

export default {
  name: 'MainComponent',
  data() {
    return {
      tasks: [],
      newName: "",
      newDescription: "",
      newDate: null,
      newTime: null,

      updateTask: null,
    }
  },
  components: {
    PopupComponent
  },
  computed: {
    _updateTaskDate: {
      get() {
				let date = new Date(this.updateTask.datestart).toISOString().split('T')[0]
				return date
      },
      set(newVal) {
        let date = new Date(newVal + "T" + new Date(this.updateTask.datestart).toISOString().split('T')[1])
				this.updateTask.datestart = date
      }
    },

    _updateTaskTime: {
      get() {
        let time = new Date(this.updateTask.datestart).toISOString().split('T')[1]
        return time.replace("Z", "")
      },
      set(newVal) {
        let date = new Date(new Date(this.updateTask.datestart).toISOString().split('T')[0] + "T" + newVal + "Z")
        this.updateTask.datestart = date
      }
    },
  },
  methods: {
      updateEvent() {
        this.$store.dispatch(TASK_UPDATE, this.updateTask).then(task => {
          this.tasks = this.tasks.filter(elemTask => {
            return elemTask.id !== task.id;
          })
          this.tasks.push(task)
          this.$refs.updateEventPopup.hideModal()
        }).catch(err => this.$store.dispatch(HTTP_ERROR, {error: err, router: this.$router}))
      },

      showUpdateEventPopup(task) {
        this.updateTask = Object.assign({}, task);
        this.$refs.updateEventPopup.showModal()
      },

      addNewEvent() {
        const {newName, newDescription, newDate, newTime} = this
        let dateTime = new Date(newDate + ' ' + newTime);
        const newTask = {
          name: newName,
          description: newDescription,
          datestart: dateTime,
        }
        this.$store.dispatch(TASK_CREATE, newTask).then(task => {
          this.tasks.push(task)
          this.$refs.addEventPopup.hideModal()
        }).catch(err => this.$store.dispatch(HTTP_ERROR, {error: err, router: this.$router}))
      },

      showAddEventPopup() {
        this.$refs.addEventPopup.showModal()
      },

      formatDateTime(task, dateTimePattern) {
        return moment(task.datestart).format(dateTimePattern)
      },

      deleteTask(task) {
        this.$store.dispatch(TASK_DELETE, task)
          .then(() => {
            this.tasks = this.tasks.filter(function(elemTask) {
              return elemTask.id !== task.id;
            });
          })
          .catch(error => this.$store.dispatch(HTTP_ERROR, {error, router: this.$router}))
      },
  },
  mounted() {
    this.$store.dispatch(TASKS_GET).then((taskList) => {
      this.tasks=taskList || []
    }).catch(error => this.$store.dispatch(HTTP_ERROR, {error, router: this.$router}))
  }
}
</script>

<style scoped lang="scss" src="@/assets/scss/main/main-component.scss">
</style>

