import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home';

const appRoute = '/sub-vue2';

const routes = [
  {
    path: `${appRoute}/home`,
    name: 'home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
