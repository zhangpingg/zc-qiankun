import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home";
import PageB from "../pages/pageB/pageBList.vue";

const appRoute = "/sub-vue2";

const routes = [
    {
        path: `${appRoute}/home`,
        name: "home",
        component: Home,
        meta: {
            keepAlive: true,
        },
    },
    {
        path: `${appRoute}/pageB`,
        name: "pageB",
        meta: {
            title: "BÒ³Ãæ",
            keepAlive: true,
        },
        component: PageB,
    },
];
Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    mode: "history",
});
router.beforeEach(async (to, from, next) => {
    next();
});

export default router;
