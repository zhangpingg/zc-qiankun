import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {start, registerMicroApps} from 'qiankun';
import router from './router'

createApp(App).use(router).mount('#app')

const apps = [
  {
    name: 'sub-vue',
    entry: '//127.0.0.1:3002/sub-vue',
    activeRule: '/sub-vue',
    container: '#subVueId',
    props: {
      data: '基座的数据',
    }
  },
  {
    name: 'childVue',
    entry: '//127.0.0.1:8080',
    activeRule: '/childVue',
    container: '#subVueId',
    props: {
      data: '基座的数据',
    }
  }
]

registerMicroApps(apps, {})

start()