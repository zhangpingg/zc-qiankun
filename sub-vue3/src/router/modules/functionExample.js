import { applyRoute } from '../const';

const functionExampleRoutes = [
    {
        path: `${applyRoute}/functionExample/imgDotting/index`,
        meta: {
            title: '图片上打点',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/functionExample/imgDotting/index.vue'),
    },
];

export { functionExampleRoutes };
