// 用户相关的小仓库
import { defineStore } from 'pinia'
import { loginForm, loginResponseData } from '@/api/user/type.ts'
import { reqLogin } from '@/api/user'
import { UserState } from '@/store/modules/types/type.ts'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token.ts'
// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户地唯一标识
    }
  },
  // 异步、逻辑
  actions: {
    // 用户登入的方法
    async userLogin(data: loginForm) {
      console.log(data)
      const result: loginResponseData = await reqLogin(data)
      //登入请求：成功200----token.ts
      //登入请求：失败201--登入失败错误的信息
      if (result?.code === 200) {
        // pinia仓库存储token
        // pinia|vuex存储数据都是利用js对象，并非持久化
        this.token = result?.data?.token as string
        // localStorage.setItem('TOKEN', result.data.token as string)
        SET_TOKEN(result.data.token as string)
        // 能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore