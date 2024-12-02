import Vue from "vue";
import VueRouter from "vue-router";
import { exportRoutes } from "./modules/export";
import { customerRoutes } from "./modules/customer";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [...exportRoutes, ...customerRoutes],
    mode: "history",
});

export default router;
