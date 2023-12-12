<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" :icon="Plus">添加品牌</el-button>
      <el-table :data="tableData" style="margin: 10px 0" border>
        <el-table-column label="序号" width="180" type="index" />
        <el-table-column prop="name" label="品牌名称" width="180" />
        <el-table-column prop="name" label="品牌LOGO" />
        <el-table-column prop="address" label="品牌操作" />
      </el-table>

      <el-pagination
        background
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[10, 20, 30, 40]"
        :small="small"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

// 分页
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const small = ref(false)
const total = ref(0)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped></style>
