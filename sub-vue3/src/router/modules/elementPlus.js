import { applyRoute } from '../const';

const elementPlusRoutes = [
    {
        path: `${applyRoute}/elementPlus/form`,
        meta: {
            title: 'test',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/elementPlus/form/index.vue'),
    },
    {
        path: `${applyRoute}/elementPlus/treeDraggable`,
        meta: {
            title: 'tree树拖拽位置',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/elementPlus/treeDraggable/index.vue'),
    },
];

export { elementPlusRoutes };
