import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { start, registerMicroApps } from 'qiankun';
import router from './router';
import ViewUIPlus from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';

createApp(App).use(router).use(ViewUIPlus).mount('#app');

const apps = [
    {
        name: 'sub-vue2',
        //entry: '//10.1.86.247:12022', // 测试环境
        entry: '//localhost:8080', // 本地
        activeRule: '/sub-vue2',
        container: '#subConatiner',
        props: {
            data: '基座的数据',
        },
    },
    {
        name: 'sub-vue3',
        //entry: '//10.1.86.247:12022', // 测试环境
        entry: '//localhost:3002', // 本地
        activeRule: '/sub-vue3',
        container: '#subConatiner',
        props: {
            data: '基座的数据',
        },
    },
];

registerMicroApps(apps, {});

start();
