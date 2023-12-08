<template>
  <div class="layout_container">
    <div
      class="layout_slider"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <!--  展示菜单    -->
      <!--  滚动组件    -->
      <el-scrollbar class="scrollbar">
        <!--  菜单组件    -->
        <el-menu
          :collapse="layOutSettingStore.fold"
          background-color="#001529"
          text-color="white"
          active-text-color="yellowgreen"
          :default-active="$route.path"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Tabbar from '@/layout/tabbar/index.vue'
// 获取路由对象
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()

// 获取路由对象
let $route = useRoute()

import Logo from '@/layout/logo/index.vue'
// 引入菜单组件
import Menu from '@/layout/menu/index.vue'

import Main from '@/layout/main/index.vue'

// 获取小仓库中的控制折叠展开变量 fold
import useLayOutSettingStore from '@/store/modules/setting.ts'
// 获取仓库
let layOutSettingStore = useLayOutSettingStore()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100%;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    color: white;
    background-color: $base-menu-background;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0;
    right: 0;
    width: calc(100% - $base-menu-width);
    left: $base-menu-width;
    height: $base-tabbar-height;
    transition: all 0.3s;
    //background: $base-tabbar-background;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    right: 0;
    top: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: $base-main-background;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
    }
  }
}
</style>
