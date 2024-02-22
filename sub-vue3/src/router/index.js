import { createRouter, createWebHistory } from 'vue-router';
import { userRoutes } from './modules/userInfo';
import { exportListRoutes } from './modules/exportList';

const router = createRouter({
    history: createWebHistory(),
    routes: [...userRoutes, ...exportListRoutes],
});

export default router;
