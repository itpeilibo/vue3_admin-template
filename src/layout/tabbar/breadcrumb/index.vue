<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting.ts'
import { useRoute } from 'vue-router'

let layOutSettingStore = useLayOutSettingStore()

const changeIcon = () => {
  // 图标替换
  layOutSettingStore.fold = !layOutSettingStore.fold
}

let $route = useRoute()
const handler = () => {
  console.log($route.matched)
}
</script>

<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>

  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight" @click="handler">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 渲染图标 -->
      <el-icon style="margin: 0 2px">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 渲染面包屑标题 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped></style>
