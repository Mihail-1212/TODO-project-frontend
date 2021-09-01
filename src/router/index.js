import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'


/* Проверяет неавторизован ли пользователь и переносит его на главную страницу */
const ifNotAuthenticated = (to, from, next) => {
  next()
  // if (!store.getters.isAuth) {
  //     next()
  //     return
  // }
  // next( {name: "Main"} )
}

/* Проверяет авторизован ли пользователь и переносит его на страницу авторизации */
const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuth) {
      next()
      return
  }
  next( {name: "Login"} )
}

const routes = [
  {
    path: '/',
    name: 'Main',
    beforeEnter: ifAuthenticated,
    /* view actually - not component */
    component: () => import('../views/Main.vue')
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: ifNotAuthenticated,
    component: () => import('../views/Auth.vue')
  },
  { 
    path: "/:pathMatch(.*)*", 
    component: () => import('../views/PathNotFound.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  /* Метод для прокрутки страницы вверх после перехода по router-link */
  scrollBehavior() {
    return {
        top: 0
    }
  }
})

export default router
