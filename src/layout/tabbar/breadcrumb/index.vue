<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting.ts'

let layOutSettingStore = useLayOutSettingStore()

const changeIcon = () => {
  // 图标替换
  layOutSettingStore.fold = !layOutSettingStore.fold
}
</script>

<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>

  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped></style>
