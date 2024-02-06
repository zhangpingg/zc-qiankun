import BasicLayouts from '@/components/basicLayouts';
import SubApply from '@/components/subApply';
import Login from '@/pages/account/login';
import Home from '@/pages/home';
import Error403 from '@/pages/error/403';
import Error404 from '@/pages/error/404';
import Error500 from '@/pages/error/500';

// 在主框架之外显示
const frameOut = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            auth: false,
        },
        component: Login,
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
        component: BasicLayouts,
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {
                    auth: true, // 路由拦截有用
                },
                component: Home,
            },
            {
                path: 'sub-vue2/:oneLevel/:twoLevel?/:threeLevel?',
                name: 'sub-vue2',
                meta: {
                    auth: true, // 路由拦截有用
                    isSubApply: true,
                },
                component: SubApply,
            },
            {
                path: 'sub-vue3/:oneLevel/:twoLevel?/:threeLevel?',
                name: 'sub-vue3',
                meta: {
                    auth: true, // 路由拦截有用
                    isSubApply: true,
                },
                component: SubApply,
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
        component: Error403,
    },
    {
        path: '/:pathMatch(.*)',
        name: '404',
        meta: {
            title: '404',
        },
        component: Error404,
    },
    {
        path: '/500',
        name: '500',
        meta: {
            title: '500',
        },
        component: () => Error500,
    },
];

export default [...frameOut, ...frameIn, ...errorPage];
