import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home";
import PageB from "../pages/pageB/pageBList.vue";

const applyRoute = "/sub-vue2";

const routes = [
    {
        path: `${applyRoute}/home`,
        name: "home",
        component: Home,
        meta: {
            keepAlive: true,
        },
    },
    {
        path: `${applyRoute}/pageB`,
        name: "pageB",
        meta: {
            title: "B页面",
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
