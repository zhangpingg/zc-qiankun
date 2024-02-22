import Vue from "vue";
import VueRouter from "vue-router";
import { customerRoutes } from "./modules/customer";
import { exportRoutes } from "./modules/export";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [...customerRoutes, ...exportRoutes],
    mode: "history",
});

export default router;
