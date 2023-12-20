<template>
  <Category :scene="scene"></Category>

  <el-card style="margin: 10px 0">
    <div v-show="scene == 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!categoryStore.c3Id"
        @click="addAttr"
      >
        添加属性
      </el-button>

      <el-table
        border
        style="margin: 10px 0"
        :data="attrArr"
        max-height="500px"
      >
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
            <el-button type="primary" @click="updateAttr">编辑</el-button>
            <el-button type="primary">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-show="scene == 1">
      <!--  展示添加属性与修改数据的结构   -->
      <el-form>
        <el-form-item label="属性名称">
          <el-input
            placeholder="请输入属性名称"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="default" icon="Plus">
        添加属性值
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column
          width="80px"
          type="index"
          align="center"
          label="序号"
        ></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="属性值操作"></el-table-column>
      </el-table>
      <el-button size="default" type="primary">保存</el-button>
      <el-button size="default" type="primary">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import useCategoryStore from '@/store/modules/category.ts'
import { reactive, ref, watch } from 'vue'
import { reqAttr } from '@/api/product/attr'
import { Attr, AttrResponseData } from '@/api/product/attr/type.ts'
let categoryStore = useCategoryStore()

//存储已有的属性与属性值
let attrArr = ref<Attr[]>([])

// 定义card组件内容切换变量
let scene = ref<number>(0) //scene=0,显示table,scene=1,展示添加与修改属性结构

//收集新增的属性的数据
let attrParams = reactive<any>({
  attrName: '', //新增的属性的名字
  attrValueList: [
    //新增的属性值数组
  ],
  categoryId: '', //三级分类的ID
  categoryLevel: 3, //代表的是三级分类
})
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
}

//添加属性值按钮的回调
const addAttr = () => {
  //点击添加属性值按钮的时候,向数组添加一个属性值对象
  scene.value = 1
}

// table表格修改已有属性按钮的回调
const updateAttr = () => {}

// 取消添加属性值
const cancel = () => {
  scene.value = 0
}
</script>

<style scoped></style>
