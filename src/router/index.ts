// 对外暴露配置路由（常量路由）
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from '@/router/routes.ts'

// 创建路由器
const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  routes: constantRoute,

  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
