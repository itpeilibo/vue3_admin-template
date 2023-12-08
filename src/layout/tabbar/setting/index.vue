<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<script lang="ts" setup>
import useLayOutSettingStore from '@/store/modules/setting.ts'

let layOutSettingStore = useLayOutSettingStore()

// 点击刷新的回调
const refreshChange = () => {
  layOutSettingStore.refresh = !layOutSettingStore.refresh
}

// 点击实现全屏切换
const fullScreen = () => {
  //DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
  let full = document.fullscreenElement
  console.log(full)
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    //变为不是全屏模式->退出全屏模式
    document.exitFullscreen()
  }
}
</script>
<template>
  <el-button size="small" icon="Refresh" circle @click="refreshChange" />

  <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
  <el-button size="small" icon="Setting" circle />
  <img
    src="../../../../public/hero.jpg"
    style="width: 32px; height: 24px; margin: 0 10px"
  />

  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      Admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登入</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped></style>
