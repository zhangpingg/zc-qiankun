import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/home/index.vue';
import PageA from '@/pages/pageA/index.vue';

const appRoute = '/sub-vue3';

const routes = [
    {
        path: `${appRoute}/home`,
        name: 'home',
        meta: {
            title: '首页',
            keepAlive: true,
        },
        component: Home,
    },
    {
        path: `${appRoute}/pageA`,
        name: 'pageA',
        meta: {
            title: 'A页面',
            keepAlive: true,
        },
        component: PageA,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
