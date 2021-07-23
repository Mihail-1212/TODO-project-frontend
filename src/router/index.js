import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Main',
    /* view actually - not component */
    component: () => import('../views/Main.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/Auth.vue')
  },
  { 
    path: "/:pathMatch(.*)*", 
    component: () => import('../views/PathNotFound.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
