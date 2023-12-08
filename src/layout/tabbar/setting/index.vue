<script setup lang="ts"></script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<template>
  <el-button size="small" icon="Refresh" circle />
  <el-button size="small" icon="FullScreen" circle />
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
