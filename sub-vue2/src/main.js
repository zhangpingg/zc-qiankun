import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// let instance = null;
function render(props = {}) {
    console.log(11, props);
    new Vue({
        router,
        render: (h) => h(App),
    }).$mount(props?.container?.querySelector("#app") || "#app");
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log("【vue-bootstrap】");
}
export async function mount(props) {
    console.log("【vue-mount】", props);
    render(props);
}
export async function unmount() {
    //instance = null;
}
