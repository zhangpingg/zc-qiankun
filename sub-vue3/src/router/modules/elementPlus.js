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
];

export { elementPlusRoutes };
