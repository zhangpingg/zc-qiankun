import { applyRoute } from '../const';

const functionDemoRoutes = [
    {
        path: `${applyRoute}/functionDemo/imgDotting`,
        meta: {
            title: '图片上打点',
            auth: true,
            cache: true,
        },
        // component: () => import('@/pages/exportList/index.vue'),
        component: () => import('@/pages/functionDemo/imgDotting/index.vue'),
    },
];

export { functionDemoRoutes };
