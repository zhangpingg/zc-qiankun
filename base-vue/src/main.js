import { createApp } from 'vue';
import App from './App.vue';
import { start, registerMicroApps } from 'qiankun';
import router from './router';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import { usePageStore } from '@/store';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import './styles/index.less';
import { subApplyUrl } from '../config/subEnv';

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App).use(pinia).use(router).mount('#app');

const pageStore = usePageStore();

const apps = [
    {
        name: 'sub-vue2',
        entry: subApplyUrl[subApplyUrl.environment].subVue2Url,
        activeRule: (location) => location.pathname.startsWith('/sub-vue2'),
        container: '#subContainer',
        // 共享数据到子应用
        props: {
            pageStore,
        },
    },
    {
        name: 'sub-vue3',
        entry: subApplyUrl[subApplyUrl.environment].subVue3Url,
        activeRule: (location) => location.pathname.startsWith('/sub-vue3'),
        container: '#subContainer',
        props: {
            pageStore,
        },
    },
];

registerMicroApps(apps, {});

start();
