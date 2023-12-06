import { createApp } from 'vue'

// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
// 获取应用实例到挂载点上
const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
