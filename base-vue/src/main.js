import { createApp } from 'vue';
import App from './App.vue';
import { start, registerMicroApps } from 'qiankun';
import router from './router';
import ViewUIPlus from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import { usePageStore } from '@/store';
import './styles/index.less';

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App).use(pinia).use(router).use(ViewUIPlus).mount('#app');

const pageStore = usePageStore();

const apps = [
    {
        name: 'sub-vue2',
        //entry: '//10.1.86.247:12023', // 测试环境
        entry: '//localhost:8081', // 本地
        activeRule: (location) => location.pathname.startsWith('/sub-vue2'),
        container: '#subContainer',
        // 共享数据到子应用
        props: {
            pageStore,
        },
    },
    {
        name: 'sub-vue3',
        //entry: '//10.1.86.247:12022', // 测试环境
        entry: '//localhost:8082', // 本地
        activeRule: (location) => location.pathname.startsWith('/sub-vue3'),
        container: '#subContainer',
        props: {
            pageStore,
        },
    },
];

registerMicroApps(apps, {});

start();
