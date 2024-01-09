import { createRouter, createWebHistory } from "vue-router";
import Setting from "@/setting.js";
import Login from "../pages/login/index.vue";
import ViewUIPlus from "view-ui-plus";

const routes = [
    {
        path: "/",
        redirect: {
            name: "login",
        },
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "登录",
            keepAlive: true,
        },
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

// 路由拦截
router.beforeEach(async (to, from, next) => {
    if (Setting.showProgressBar) {
        ViewUIPlus.LoadingBar.start();
    }
    next();
});
router.afterEach((to) => {
    if (Setting.showProgressBar) {
        ViewUIPlus.LoadingBar.finish();
    }
    // 多页控制 打开新的页面
    // store.dispatch("admin/page/open", to);
    // 更改标题
    //util.title({
    //    title: to.meta.title,
    //});
    // 返回页面顶端
    window.scrollTo(0, 0);
});

export default router;
