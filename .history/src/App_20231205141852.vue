<template>
  <div>
    <el-row>
      <el-button type="primary" circle>按钮</el-button>
      <el-pagination
        v-model:current-page="currentPage1"
        :page-size="100"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, prev, pager, next"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
