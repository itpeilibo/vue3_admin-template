<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!--  没有子路由   -->
    <template v-if="!item.children">
      <el-menu-item
        :index="item.path"
        v-if="!item.meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!--  有子路由但是只有一个子路由   -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        @click="goRoute"
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!--  有子路由且个数大于一个   -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
// 获取父组件传递过来的全部组件
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

defineProps(['menuList'])
// 获取路由对象
let $router = useRouter()

// 点击菜单进行路由跳转
const goRoute = (vc: any) => {
  console.log('点击跳转', vc)
  $router.push(vc.index)
}
</script>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped></style>
