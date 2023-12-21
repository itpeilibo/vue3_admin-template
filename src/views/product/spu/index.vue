<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!categoryStore.c3Id"
      >
        添加SPU
      </el-button>
      <el-table border style="margin: 10px" :data="records">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="SPU名称"
          prop="spuName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="SPU描述"
          prop="description"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="SPU操作">
          <template #="{ row, $index }">
            <el-button type="primary" icon="Plus" title="添加SKU"></el-button>
            <el-button type="primary" icon="Edit" title="修改SKU"></el-button>
            <el-button type="primary" icon="View" title="查看SKU"></el-button>
            <el-button type="primary" icon="Delete" title="删除SKU"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper,->, sizes,total"
        :total="total"
        @current-change="getHasSpu"
        @size-change="changeSize"
      />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import { ref, watch } from 'vue'
// 引入分类仓库
import useCategoryStore from '@/store/modules/category.ts'
import { reqHasSpu } from '@/api/product/spu'
import { HasSpuResponseData, Records } from '@/api/product/spu/type.ts'
let categoryStore = useCategoryStore()
//场景的数据
let scene = ref<number>(0)
//分页器默认页码
let pageNo = ref<number>(1)
//每一页展示几条数据
let pageSize = ref<number>(3)

let total = ref<number>(0)

let records = ref<Records>([])

//监听三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    //当三级分类发生变化的时候清空对应的数据
    records.value = []
    //务必保证有三级分类ID
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)
//此方法执行:可以获取某一个三级分类下全部的已有的SPU
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}

const changeSize = () => {
  getHasSpu()
}
</script>

<style scoped></style>
