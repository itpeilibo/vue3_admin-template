<template>
  <div>{{ userStore.username }}</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
//引入用户相关的仓库,获取当前用户的头像、昵称
import useUserStore from '@/store/modules/user.ts'

//获取存储用户信息的仓库对象
let userStore = useUserStore()

//首页挂在完毕通知小仓库发请求拿数据
onMounted(() => {
  userStore.getUserInfo()
})
</script>
