import { createApp } from 'vue'

// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
