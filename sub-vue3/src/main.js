import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import router from './router';
import ViewUIPlus from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

let app;

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    createApp(App).use(router).use(ViewUIPlus).use(ElementPlus).mount('#app');
} else {
    renderWithQiankun({
        bootstrap() {
            console.log('bootstrap');
        },
        mount(props) {
            app = createApp(App);
            app.use(router)
                .use(ViewUIPlus)
                .mount(props?.container?.querySelector('#app') || '#app');
            console.log('mount');
        },
        update() {
            console.log('update');
        },
        unmount(props) {
            console.log('vue子应用卸载', props);
            app = null;
        },
    });
}
