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

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage1 = ref(5)
const currentPage2 = ref(5)
const currentPage3 = ref(5)
const currentPage4 = ref(4)
const pageSize2 = ref(100)
const pageSize3 = ref(100)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style></style>
