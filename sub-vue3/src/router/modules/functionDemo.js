import { applyRoute } from '../const';

const functionDemoRoutes = [
    {
        path: `${applyRoute}/functionDemo/imgDotting`,
        meta: {
            title: '图片上打点',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/functionDemo/imgDotting/index.vue'),
    },
    {
        path: `${applyRoute}/functionDemo/elementTreeDraggable`,
        meta: {
            title: 'tree树拖拽位置',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/functionDemo/elementTreeDraggable/index.vue'),
    },
];

export { functionDemoRoutes };
