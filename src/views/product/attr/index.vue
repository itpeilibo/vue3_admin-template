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
        max-height="600px"
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
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addAttrValue"
        :disabled="!attrParams.attrName"
      >
        添加属性值
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-table border style="margin: 10px 0" :data="attrParams.attrValueList">
        <el-table-column
          width="80px"
          type="index"
          align="center"
          label="序号"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-input
              :ref="(vc: any) => (inputArr[$index] = vc)"
              v-if="row.flag"
              placeholder="请输入属性值名称"
              v-model="row.valueName"
              @blur="toLook(row, $index)"
            ></el-input>
            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="($event) => attrParams.attrValueList.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        size="default"
        type="primary"
        @click="save"
        :disabled="!attrParams.attrValueList.length"
      >
        保存
      </el-button>
      <el-button size="default" type="primary">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import useCategoryStore from '@/store/modules/category.ts'
import { nextTick, reactive, ref, watch } from 'vue'
import { reqAddOrUpdateAttr, reqAttr } from '@/api/product/attr'
import { Attr, AttrResponseData, AttrValue } from '@/api/product/attr/type.ts'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()

//存储已有的属性与属性值
let attrArr = ref<Attr[]>([])

// 定义card组件内容切换变量
let scene = ref<number>(0) //scene=0,显示table,scene=1,展示添加与修改属性结构

//准备一个数组:将来存储对应的组件实例el-input
let inputArr = ref<any>([])

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
  //每一次点击的时候,先清空一下数据再收集数据
  Object.assign(attrParams, {
    attrName: '', //新增的属性的名字
    attrValueList: [
      //新增的属性值数组
    ],
    categoryId: '', //三级分类的ID
    categoryLevel: 3, //代表的是三级分类
  })
  //切换为添加与修改属性的结构
  scene.value = 1
  // 点击这个按钮的时候手机新增属性的三级分类的ID
  attrParams.categoryId = categoryStore.c3Id
}

// table表格修改已有属性按钮的回调
const updateAttr = () => {}

// 取消添加属性值
const cancel = () => {
  scene.value = 0
}

//添加属性值按钮的回调
const addAttrValue = () => {
  //点击添加属性值按钮的时候,向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制每一个属性值编辑模式与切换模式的切换
  })

  //获取最后el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

// 保存
const save = async () => {
  // 收集参数
  // 发起请求
  let result = await reqAddOrUpdateAttr(attrParams)
  if (result.code === 200) {
    // 切换场景
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    await getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

// 属性值表单元素失去焦点的方法
const toLook = (row: AttrValue, $index: number) => {
  //非法情况判断1
  if (row.valueName.trim() === '') {
    //删除调用对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    //提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  //非法情况2
  let repeat = attrParams.attrValueList.find((item) => {
    //切记把当前失却焦点属性值对象从当前数组扣除判断
    if (item != row) {
      return item.valueName === row.valueName
    }
  })

  if (repeat) {
    //将重复的属性值从数组当中干掉
    attrParams.attrValueList.splice($index, 1)
    //提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }

  //相应的属性值对象flag:变为false,展示div
  row.flag = false
}

//属性值div点击事件
const toEdit = (row: AttrValue, $index: number) => {
  //相应的属性值对象flag:变为true,展示input
  row.flag = true
  //nextTick:响应式数据发生变化,获取更新的DOM(组件实例)
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
</script>

<style scoped></style>
