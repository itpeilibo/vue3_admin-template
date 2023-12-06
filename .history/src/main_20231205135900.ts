import { createApp } from 'vue'

// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
// 获取应用实例对象
const app = createApp(App)

app.use(ElementPlus)
// 将应用挂载到挂载点上
app.mount('#app')
