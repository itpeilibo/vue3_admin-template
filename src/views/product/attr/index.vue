<template>
  <Category></Category>

  <el-card style="margin: 10px 0">
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      :disabled="!categoryStore.c3Id"
    >
      添加属性
    </el-button>

    <el-table border style="margin: 10px 0" :data="attrArr" max-height="500px">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        prop="attrName"
        label="属性名称"
        width="120px"
      ></el-table-column>
      <el-table-column label="属性值名称">
        <template #="{ row, $index }">
          <el-tag
            style="margin: 5px"
            v-for="item in row.attrValueList"
            :key="item.id"
          >
            {{ item.valueName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #="{ row, $index }">
          <el-button type="primary">编辑</el-button>
          <el-button type="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import useCategoryStore from '@/store/modules/category.ts'
import { ref, watch } from 'vue'
import { reqAttr } from '@/api/product/attr'
import { Attr, AttrResponseData } from '@/api/product/attr/type.ts'
let categoryStore = useCategoryStore()

//存储已有的属性与属性值
let attrArr = ref<Attr[]>([])

//监听仓库三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    //清空上一次查询的属性与属性值
    attrArr.value = []
    //保证三级分类得有才能发请求
    if (!categoryStore.c3Id) return
    //获取分类的ID
    getAttr()
  },
)

//获取已有的属性与属性值方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  //获取分类下的已有的属性与属性值
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)

  if (result.code === 200) {
    attrArr.value = result.data
  }
  console.log('数据', result)
}
</script>

<style scoped></style>
