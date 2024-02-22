import { applyRoute } from '../const';

const userRoutes = [
    {
        path: `${applyRoute}/user/userManage`,
        meta: {
            title: '用户管理',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/user/userManage/index.vue'),
    },
    {
        path: `${applyRoute}/user/userManage/userDetail`,
        meta: {
            title: '用户详情',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/user/userManage/userDetail.vue'),
    },
    {
        path: `${applyRoute}/user/userApply`,
        meta: {
            title: '用户申请',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/user/userApply/index.vue'),
    },
    {
        path: `${applyRoute}/user/userApply/applyDetail`,
        meta: {
            title: '申请详情',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/user/userApply/applyDetail.vue'),
    },
];

export { userRoutes };
