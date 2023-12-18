//商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import { reqC1 } from '@/api/product/attr'
import { CategoryResponseData } from '@/api/product/attr/type.ts'
import { CategoryState } from '@/store/modules/types/type.ts'

const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      //存储一级分类的数据
      c1Arr: [],
      // c2Arr: [],
      //存储一级分类的ID
      c1Id: '',
    }
  },
  actions: {
    //获取一级分类的方法
    async getC1() {
      //发请求获取一级分类的数据
      const result: CategoryResponseData = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result?.data
      }
    },

    //获取二级分类的数据
    // async getC2() {
    //   const result: CategoryResponseData = await reqC2(this.c1Id)
    //   if (result.code == 200) {
    //     this.c2Arr = result.data
    //   }
    // },
  },
})

export default useCategoryStore
