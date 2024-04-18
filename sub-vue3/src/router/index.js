import { createRouter, createWebHistory } from 'vue-router';
import { userRoutes } from './modules/user';
import { exportListRoutes } from './modules/exportList';
import {functionDemoRoutes} from './modules/functionDemo'

const router = createRouter({
    history: createWebHistory(),
    routes: [...userRoutes, ...exportListRoutes, ...functionDemoRoutes],
});

export default router;
