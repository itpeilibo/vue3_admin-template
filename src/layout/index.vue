<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <!--  展示菜单    -->
      <!--  滚动组件    -->
      <el-scrollbar class="scrollbar">
        <!--  菜单组件    -->
        <el-menu background-color="#001529" text-color="white">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">222</div>
    <!-- 内容展示区域 -->
    <div class="layout_main">
      <p style="height: 1000px">我是一个段落</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
// 引入菜单组件
import Menu from '@/layout/menu/index.vue'

// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100%;
  background-color: pink;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0;
    right: 0;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: $base-tabbar-background;
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
  }
}
</style>
