import Vue from 'vue';
import App from './App.vue';
import router from './router';
// ViewUI
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
// iViewPro
import iViewPro from '@/libs/iview-pro/iview-pro.min.js';
import './libs/iview-pro/iview-pro.css';
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 本地样式
import './styles/index.less';

Vue.use(ViewUI);
Vue.use(iViewPro);
Vue.use(ElementUI);

function render(props = {}) {
    new Vue({
        router,
        render: (h) => h(App),
    }).$mount(props?.container?.querySelector('#app') || '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log('【vue-bootstrap】');
}
export async function mount(props) {
    console.log('【vue-mount】', props);
    window.$basePageStore = props.pageStore;
    window.$baseAccountStore = props.accountStore;
    render(props);
}
export async function unmount() {}
