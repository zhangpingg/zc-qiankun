import {createRouter, createWebHistory} from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue'

const routes = [
  {
    path: '/sub-vue',
    name: 'sub-vue',
    meta: {
        title: 'sub-vue',
    },
    component: HelloWorld,
},
]

// 导出路由 在 main.js 里使用
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;
