<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" :icon="Plus">添加品牌</el-button>
      <el-table
        :data="trademarkArr"
        style="margin: 10px 0"
        border
        max-height="700px"
      >
        <el-table-column label="序号" type="index" />
        <el-table-column prop="tmName" label="品牌名称">
          <template #="{ row }">
            <span>{{ row.tmName || '/' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="logoUrl" label="品牌LOGO">
          <template #="{ row }">
            <img :src="row.logoUrl" style="width: 50px; height: 50px" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="品牌操作">
          <template #default>
            <el-button size="mini" type="primary" :icon="Edit"></el-button>
            <el-button size="mini" type="danger" :icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        v-model:current-page="pageNo"
        v-model:page-size="limit"
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
import { Check, Delete, Edit, Plus } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'

const trademarkArr = ref([])

// 分页
// 当前页
const pageNo = ref(1)
// 当前页数量
const limit = ref(10)
const small = ref(false)
const total = ref(0)

const getHasTrademark = async () => {
  const { data } = await reqHasTrademark(pageNo.value, limit.value)
  console.log('数据', data)
  trademarkArr.value = data.records
  total.value = data.total
  pageNo.value = data.current
  limit.value = data.size
}
onMounted(() => {
  getHasTrademark()
})

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped></style>
