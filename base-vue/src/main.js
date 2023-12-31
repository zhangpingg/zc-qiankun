import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {start, registerMicroApps} from 'qiankun';

createApp(App).mount('#app')

const apps = [
  {
    name: 'sub-vue',
    entry: '//127.0.0.1:3002/sub-vue',
    activeRule: '/sub-vue',
    container: '#subVueId'
  }
]

registerMicroApps(apps, {})

start()