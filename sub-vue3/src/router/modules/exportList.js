import { applyRoute } from '../const';

const exportListRoutes = [
    {
        path: `${applyRoute}/export/exportList`,
        meta: {
            title: '导出列表',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/exportList/index.vue'),
    },
];

export { exportListRoutes };
