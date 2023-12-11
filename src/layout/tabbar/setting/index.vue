<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<script lang="ts" setup>
import useLayOutSettingStore from '@/store/modules/setting.ts'
let layOutSettingStore = useLayOutSettingStore()

import useUserStore from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'
let userStore = useUserStore()
let $router = useRouter()

let $route = useRoute()

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

//退出登录点击回调
const logout = async () => {
  //第一件事情:需要向服务器发请求[退出登录接口]******暂时没有
  //第二件事情:仓库当中关于用于相关的数据清空[token|username|avatar]
  //第三件事情:跳转到登录页面
  await userStore.userLogout()

  // 跳转到登录页面
  await $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<template>
  <el-button size="small" icon="Refresh" circle @click="refreshChange" />

  <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
  <el-button size="small" icon="Setting" circle />
  <img
    :src="userStore.avatar"
    style="width: 32px; height: 24px; margin: 0 10px"
  />

  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登入</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped></style>
