<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
// 控制组件销毁与创建
import { nextTick, ref, watch } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting.ts'
let layOutSettingStore = useLayOutSettingStore()
let flag = ref(true)
// 监听仓库中的refresh，如果发生变化说明用户点击刷新按钮
watch(
  () => layOutSettingStore.refresh,
  () => {
    //refresh变化，则销毁组件
    flag.value = false
    //等待组件完毕重新加载
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
