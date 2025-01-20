import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import router from './router';
// view-ui-plus：因为组件名和自己封装的组件名很类似，所以尽量避免全局引入，按需引入比较好
//import ViewUIPlus from 'view-ui-plus'; // 全局引用时，会与element-plus有命名冲突
import { PageHeader, FooterToolbar, Card, Badge, Tag, Icon } from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';
// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
/** 本地 **/
import './styles/index.less';
import globalConst from './globalConst';
// 图片预览【https://www.npmjs.com/package/v-viewer】
import VueViewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    let app = createApp(App);
    app.component('PageHeader', PageHeader)
        .component('FooterToolbar', FooterToolbar)
        .component('Card', Card)
        .component('Badge', Badge)
        .component('Tag', Tag)
        .component('Icon', Icon);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
    }
    app.config.globalProperties.globalConst = globalConst;
    app.use(router).use(ElementPlus, { locale: zhCn }).use(VueViewer).mount('#app');
} else {
    let app;
    renderWithQiankun({
        bootstrap() {},
        mount(props) {
            app = createApp(App);
            app.component('PageHeader', PageHeader)
                .component('FooterToolbar', FooterToolbar)
                .component('Card', Card)
                .component('Badge', Badge)
                .component('Tag', Tag)
                .component('Icon', Icon);
            for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
                app.component(key, component);
            }
            app.config.globalProperties.globalConst = globalConst;
            app.use(router)
                .use(ElementPlus, { locale: zhCn })
                .use(VueViewer)
                .mount(props?.container?.querySelector('#app') || '#app');
            window.$basePageStore = props.pageStore;
        },
        update() {},
        unmount() {
            app = null;
        },
    });
}
