import SvgIcon from '@/components/SvgIcon/index.vue'
import Category from '@/components/Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components: any = { SvgIcon, Category }
export default {
  install(app: any) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
    // 将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
