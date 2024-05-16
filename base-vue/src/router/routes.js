// 在主框架之外显示
const frameOut = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            auth: false,
        },
        component: () => import('@/pages/account/login/index.vue'),
    },
];

// 在主框架内显示
const frameIn = [
    {
        path: '/',
        redirect: {
            name: 'home',
        },
    },
    {
        path: '/',
        component: () => import('@/components/basicLayouts/index.vue'),
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {
                    auth: true, // 路由拦截有用
                },
                component: () => import('@/pages/home/index.vue'),
            },
            {
                path: 'sub-vue2/:oneLevel/:twoLevel?/:threeLevel?',
                name: 'sub-vue2',
                meta: {
                    auth: true, // 路由拦截有用
                    isSubApply: true,
                },
                component: () => import('@/components/subApply/index.vue'),
            },
            {
                path: 'sub-vue3/:oneLevel/:twoLevel?/:threeLevel?',
                name: 'sub-vue3',
                meta: {
                    auth: true, // 路由拦截有用
                    isSubApply: true,
                },
                component: () => import('@/components/subApply/index.vue'),
            },
        ],
    },
];

// 错误页面
const errorPage = [
    {
        path: '/403',
        name: '403',
        meta: {
            title: '403',
        },
        component: () => import('@/pages/error/403/index.vue'),
    },
    {
        path: '/:pathMatch(.*)',
        name: '404',
        meta: {
            title: '404',
        },
        component: () => import('@/pages/error/404/index.vue'),
    },
    {
        path: '/500',
        name: '500',
        meta: {
            title: '500',
        },
        component: () => import('@/pages/error/500/index.vue'),
    },
];

export default [...frameOut, ...frameIn, ...errorPage];
