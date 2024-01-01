import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home/index.vue';
import PageA from '../pages/pageA/list.vue';

const appRoute = '/sub-vue';

const routes = [
  {
    path: `${appRoute}/home`,
    name: 'home',
    meta: {
      title: '首页',
    },
    component: Home,
  },
  {
    path: `${appRoute}/pageA`,
    name: 'pageA',
    meta: {
      title: 'A页面',
    },
    component: PageA,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;
