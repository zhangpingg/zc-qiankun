import { createRouter, createWebHistory } from 'vue-router';
import { applyRoute } from './const';
import { exportListRoutes } from './modules/exportList';
import { userRoutes } from './modules/user';
import { elementPlusRoutes } from './modules/elementPlus';
import { functionExampleRoutes } from './modules/functionExample';

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
        ...elementPlusRoutes,
        ...functionExampleRoutes,
    ],
});

export default router;
