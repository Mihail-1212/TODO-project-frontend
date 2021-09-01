import authModules from "@/store/modules/auth"
import taskModules from "@/store/modules/task"
import utilsModules from "@/store/modules/utils"
import { createStore } from 'vuex'


let storeOptions = {
  state: {
      url: {
          urlProtocol: "http",
          domain: "127.0.0.1",
          port: "8090",
          version: "v1"
      },
  },
  getters: {
      /* Возвращает полный URL к api */
      getFullURL: state => {
          return `${state.url.urlProtocol}://${state.url.domain}:${state.url.port}/api/${state.url.version}`
      }
  },
}

const assignObject = (saveObject, addObject) => {
  Object.keys(addObject).forEach( (currentValue) => {
      saveObject[currentValue] = Object.assign({}, saveObject[currentValue], addObject[currentValue])
  })
}

// Подключение аутентификации
assignObject(storeOptions, authModules)

// Подключение задач (TODO)
assignObject(storeOptions, taskModules)

// Подключение утилит
assignObject(storeOptions, utilsModules)

export default createStore(storeOptions)
