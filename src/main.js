import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import router from './router'
import store from './store'
import { createApp } from 'vue'


// Получение токена
// TODO: перенести token в конфиг
const token = localStorage.getItem('token')
if (token) {
    axios.defaults.headers.common['Authorization'] = token
}

// Установка заголовков для axios
const headers = {
  "accept": "application/json",
  "Content-Type": "application/json",
}
axios.defaults.headers.common = Object.assign({}, axios.defaults.headers.common, headers)

// Создание приложения
const mainApp = createApp(App)

// Установка axios
mainApp.use(VueAxios, axios)

// Установка хранилища
mainApp.use(store)

// Установка роутинга
mainApp.use(router)

// Запуск приложения
mainApp.mount('#app')
