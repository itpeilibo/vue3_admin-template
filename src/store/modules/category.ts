//商品分类全局组件的小仓库
import { defineStore } from 'pinia'

const useCategoryStore = defineStore('Category', {
  state: () => {
    return {
      //存储一级分类的数据
      c1Arr: [],
      //存储一级分类的ID
      c1Id: '',
    }
  },
  actions: {
    //获取一级分类的方法
    getC1() {},
  },
})
