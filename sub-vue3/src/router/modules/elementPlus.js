import { applyRoute } from '../const';

const elementPlusRoutes = [
    {
        path: `${applyRoute}/elementPlus/form/index`,
        meta: {
            title: 'form表单',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/elementPlus/form/index.vue'),
    },
    {
        path: `${applyRoute}/elementPlus/treeDraggable/index`,
        meta: {
            title: 'tree树拖拽位置',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/elementPlus/treeDraggable/index.vue'),
    },
];

export { elementPlusRoutes };
