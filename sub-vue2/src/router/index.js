import { createRouter, createWebHistory } from 'vue-router'
import ChildVue from '../views/child-vue'

const routes = [
  {
    path: '/',
    name: 'childVue',
    component: ChildVue
  },
  {
    path: '/childVue',
    name: 'childVue',
    component: ChildVue
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
