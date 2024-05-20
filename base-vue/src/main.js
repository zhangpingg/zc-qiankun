import { createApp } from 'vue';
import App from './App.vue';
import { start, registerMicroApps } from 'qiankun';
import router from './router';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import { usePageStore, useAccountStore } from '@/store';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import './styles/index.less';
import { getSubApplyUrl } from '../config/subEnv';

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App).use(pinia).use(router).mount('#app');

const pageStore = usePageStore();
const accountStore = useAccountStore();

const apps = [
    {
        name: 'sub-vue2',
        entry: getSubApplyUrl().subVue2Url,
        activeRule: (location) => location.pathname.startsWith('/sub-vue2'),
        container: '#subContainer',
        // 共享数据到子应用
        props: {
            pageStore,
            accountStore,
        },
    },
    {
        name: 'sub-vue3',
        entry: getSubApplyUrl().subVue3Url,
        activeRule: (location) => location.pathname.startsWith('/sub-vue3'),
        container: '#subContainer',
        props: {
            pageStore,
        },
    },
];

// 解决本地刷新页面后，子应用vue3打不开页面的情况
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const container = document.getElementById('subContainer');
        if (container) {
            registerMicroApps(apps, {});
            start();
        }
    }, 200);
});
