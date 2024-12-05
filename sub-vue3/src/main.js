import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import router from './router';
// view-ui-plus
//import ViewUIPlus from 'view-ui-plus'; // 全局引用会有命名冲突
import { Badge, Tag } from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';
// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
/** 本地 **/
import './styles/index.less';
import globalConst from './globalConst';

let app = createApp(App);

app.component('Badge', Badge).component('Tag', Tag);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.config.globalProperties.globalConst = globalConst;

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    app.use(router).use(ElementPlus, { locale: zhCn }).mount('#app');
} else {
    renderWithQiankun({
        bootstrap() {},
        mount(props) {
            app.use(router)
                //.use(ViewUIPlus)
                .use(ElementPlus, { locale: zhCn })
                .mount(props?.container?.querySelector('#app') || '#app');
            console.log('mount');
            window.$basePageStore = props.pageStore;
        },
        update() {},
        unmount() {
            app = null;
        },
    });
}
