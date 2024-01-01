import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/login/index.vue';

const routes = [
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;
