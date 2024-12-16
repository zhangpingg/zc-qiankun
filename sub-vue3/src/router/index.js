import { createRouter, createWebHistory } from 'vue-router';
import { applyRoute } from './const';
import { exportListRoutes } from './modules/exportList';
import { userRoutes } from './modules/user';
import { elementPlusRoutes } from './modules/elementPlus';
import { functionExampleRoutes } from './modules/functionExample';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: `${applyRoute}/test`,
            meta: {
                title: '测试',
                auth: true,
                cache: true,
            },
            component: () => import('@/pages/test/index.vue'),
        },
        ...exportListRoutes,
        ...userRoutes,
        ...elementPlusRoutes,
        ...functionExampleRoutes,
    ],
});

export default router;
