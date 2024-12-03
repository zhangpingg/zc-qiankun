import { applyRoute } from '../const';

const exportListRoutes = [
    {
        path: `${applyRoute}/exportList/index`,
        meta: {
            title: '导出列表',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/exportList/index.vue'),
    },
];

export { exportListRoutes };
