import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { start, registerMicroApps } from "qiankun";
import router from "./router";

createApp(App).use(router).mount("#app");

const apps = [
    {
        name: "sub-vue2",
        entry: "//localhost:8080",
        activeRule: "/sub-vue2",
        container: "#subVue2Id",
        props: {
            data: "基座的数据",
        },
    },
    {
        name: "sub-vue3",
        entry: "//localhost:3002",
        activeRule: "/sub-vue3",
        container: "#subVue3Id",
        props: {
            data: "基座的数据",
        },
    },
];

registerMicroApps(apps, {});

start();
