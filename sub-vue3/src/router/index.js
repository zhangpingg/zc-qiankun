import { createRouter, createWebHistory } from 'vue-router';
import { applyRoute } from './const';
import { exportListRoutes } from './modules/exportList';
import { userRoutes } from './modules/user';
import { functionDemoRoutes } from './modules/functionDemo';
import { elementPlusRoutes } from './modules/elementPlus';

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
        ...exportListRoutes,
        ...userRoutes,
        ...functionDemoRoutes,
        ...elementPlusRoutes,
    ],
});

export default router;
