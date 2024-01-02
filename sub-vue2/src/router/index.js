import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home";

const appRoute = "/sub-vue2";

const routes = [
    {
        path: `${appRoute}/home`,
        name: "home",
        component: Home,
    },
];
Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    mode: "history",
});

export default router;
