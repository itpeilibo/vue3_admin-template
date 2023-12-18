<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id" @change="handler">
          <el-option
            v-for="item in categoryStore.c1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select>
          <el-option label="北京"></el-option>
          <el-option label="深圳"></el-option>
          <el-option label="广州"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select>
          <el-option label="北京"></el-option>
          <el-option label="深圳"></el-option>
          <el-option label="广州"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category.ts'
let categoryStore = useCategoryStore()
console.log('当前', categoryStore.c1Id)
onMounted(() => {
  getC1()
})

//通知仓库获取一级分类的方法
const getC1 = () => {
  //通知分类仓库发请求获取一级分类的数据
  categoryStore.getC1()
}

//此方法即为一级分类下拉菜单的change事件(选中值的时候会触发,保证一级分类ID有了)
const handler = () => {
  //通知仓库获取二级分类的数据
  categoryStore.getC2()
}
</script>

<style lang="" scoped></style>
