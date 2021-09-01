import axios from "axios"
import {
  TASKS_GET,
  // TASK_GET,
  TASK_CREATE,
  TASK_DELETE,
  TASK_UPDATE,
} from "@/store/actions/task"

const state = {
 
}

const getters = {

}

const actions = {
  /* Метод получения списка задач пользователя */
  /* Auth require */
  [TASKS_GET]: ({getters}) => {
    return new Promise((resolve, reject) => {
      axios.get(
        getters.getFullURL + '/tasks/'
      ).then(response => {
        const taskList = response.data.tasks
        resolve(taskList)
      }).catch(error => reject(error))
    })
  },

  /* Метод создания новой задачи */
  /* Auth require */
  [TASK_CREATE]: ({getters}, task) => {
    return new Promise((resolve, reject) => {
      axios.post(
        getters.getFullURL + '/tasks/', task
      ).then(response => {
        const task = response.data.task
        resolve(task)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /* Метод обновления задачи */
  /* Auth require */
  [TASK_UPDATE]: ({getters}, task) => {
    return new Promise((resolve, reject) => {
      axios.put(
        getters.getFullURL + '/tasks/' + task.id, task
      ).then(response => {
        const task = response.data.task
        resolve(task)
      }).catch(error => reject(error))
    })
  },

  /* Метод удаления конкретной задачи */
  /* Auth require */
  [TASK_DELETE]: ({getters}, task) => {
    return new Promise((resolve, reject) => {
      axios.delete(
        getters.getFullURL + '/tasks/' + task.id
      ).then(response => {
        resolve(response)
      }).catch(error => reject(error))
    })
  },
}

const mutations = {
 
}

export default {
  state,
  getters,
  actions,
  mutations,
}
