import { createRouter, createWebHistory } from 'vue-router';
import Setting from '@/setting.js';
import ViewUIPlus from 'view-ui-plus';
import routes from './routes';
import util from '@/libs/util';
import { isValidArr } from '@/libs/util.tool';
import { usePageStore, useUserStore } from '@/store';

const { getCookie } = util.cookies;
const { getMenuItemByName } = util.menu;
const { modifyTitle } = util.win;

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

// 路由拦截（跳转前）
router.beforeEach(async (to, from, next) => {
    console.log('基座-路由拦截', to);
    const userStore = useUserStore();

    if (to.meta.isSubApply) {
        const { oneLevel, twoLevel, threeLevel } = to.params;
        if (oneLevel) {
            to.name = `${to.name}-${to.params.oneLevel}`;
        }
        if (twoLevel) {
            to.name = `${to.name}-${to.params.twoLevel}`;
        }
        if (threeLevel) {
            to.name = `${to.name}-${to.params.threeLevel}`;
        }
    }
    if (Setting.showProgressBar) {
        ViewUIPlus.LoadingBar.start();
    }

    // 判断是否需要登录才可以进入
    if (to.meta.auth) {
        const token = getCookie('token');
        if (token && token !== 'undefined') {
            if (!isValidArr(userStore.userInfo.menu)) {
                console.warn('没有权限跳转登录页面 --->');
                next({
                    path: '/login',
                    query: {
                        redirect: to.fullPath,
                    },
                });
            } else {
                if ((userStore.userInfo.menuPaths || []).includes(to.path)) {
                    next();
                } else {
                    /**
                     * 因为在 main.js 做了侧边栏 权限显隐，不会出现没权限的情况，先注销跳转 403，
                     * 但是可能会登录失效， 需要直接跳转登录页
                     * */
                    console.warn('没有权限跳转403页面 --->');
                    next({ path: '/403' });
                }
            }
        } else {
            // 没有登录的时候跳转到登录界面，携带上登陆成功之后需要跳转的页面完整路径
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath,
                },
            });
        }
    } else {
        next();
    }
});
// 路由（跳转后）
router.afterEach((to) => {
    const pageStore = usePageStore();
    if (Setting.showProgressBar) {
        ViewUIPlus.LoadingBar.finish();
    }
    pageStore.openTab(to);
    modifyTitle({ title: getMenuItemByName(to.name).title }); // 更改标题
    window.scrollTo(0, 0); // 返回页面顶端
});

export default router;
