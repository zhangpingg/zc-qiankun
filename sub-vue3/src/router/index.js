import { createRouter, createWebHistory } from 'vue-router';
import { applyRoute } from './const';
import { exportListRoutes } from './modules/exportList';
import { userRoutes } from './modules/user';
import { elementPlusRoutes } from './modules/elementPlus';
import { functionExampleRoutes } from './modules/functionExample';
import Bus from '@/libs/bus.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: `${applyRoute}/test`,
            meta: {
                title: '测试',
                auth: true,
                cache: true,
            },
            component: () => import('@/pages/test/index.vue'),
        },
        ...exportListRoutes,
        ...userRoutes,
        ...elementPlusRoutes,
        ...functionExampleRoutes,
    ],
});

// 路由拦截（跳转前）
router.beforeEach(async (_, from, next) => {
    if (window.$setting.detailCacheNameList.includes(from.name)) {
        Bus.emit(from.name);
    }
    next();
});

// 路由（跳转后）
router.afterEach(() => {
    const _openedTabList = JSON.parse(localStorage.getItem('Base-page')).pageInfo.openedTabList;
    window.$setting.detailCacheNameList.forEach((name) => {
        let _flag = false;
        _openedTabList.map((item) => {
            if (item.name === name) {
                _flag = true;
                return;
            }
        });
        if (!_flag) {
            localStorage.removeItem(name);
        }
    });
});

export default router;
