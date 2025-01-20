import { applyRoute } from '../const';

const userRoutes = [
    {
        path: `${applyRoute}/user/userManage/index`,
        meta: {
            title: '用户管理',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/user/userManage/index.vue'),
    },
    {
        path: `${applyRoute}/user/userManage/detail`,
        meta: {
            title: '用户详情',
            auth: true,
            cache: false,
        },
        component: () => import('@/pages/user/userManage/detail.vue'),
    },
    {
        path: `${applyRoute}/user/userApply/index`,
        meta: {
            title: '用户申请',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/user/userApply/index.vue'),
    },
    {
        path: `${applyRoute}/user/userApply/detail`,
        meta: {
            title: '申请详情',
            auth: true,
            cache: false,
        },
        component: () => import('@/pages/user/userApply/detail.vue'),
    },
];

export { userRoutes };
