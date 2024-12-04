import { createRouter, createWebHistory } from 'vue-router';
import { exportListRoutes } from './modules/exportList';
import { userRoutes } from './modules/user';
import { elementPlusRoutes } from './modules/elementPlus';
import { functionExampleRoutes } from './modules/functionExample';

const router = createRouter({
    history: createWebHistory(),
    routes: [...exportListRoutes, ...userRoutes, ...elementPlusRoutes, ...functionExampleRoutes],
});

export default router;
