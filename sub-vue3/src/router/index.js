import { createRouter, createWebHistory } from 'vue-router';
import { applyRoute } from './const';
import { userRoutes } from './modules/user';
import { exportListRoutes } from './modules/exportList';
import { functionDemoRoutes } from './modules/functionDemo';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // 首页-demo的入口
        {
            path: `${applyRoute}/home`,
            meta: {
                title: '首页',
                auth: true,
                cache: true,
            },
            component: () => import('@/pages/home/index.vue'),
        },
        ...userRoutes,
        ...exportListRoutes,
        ...functionDemoRoutes,
    ],
});

export default router;
