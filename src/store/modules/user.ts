// 用户相关的小仓库
import { defineStore } from 'pinia'
import { loginForm, loginResponseData } from '@/api/user/type.ts'
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import { UserState } from '@/store/modules/types/type.ts'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts'
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes.ts'

// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户地唯一标识
      menuRoutes: constantRoute,
      //记得到type中进行类型定义
      username: '',
      avatar: '',
    }
  },
  // 异步、逻辑
  actions: {
    // 用户登入的方法
    async userLogin(data: any) {
      const result: loginResponseData = await reqLogin(data)
      console.log('登录', result)
      //登入请求：成功200----token.ts
      //登入请求：失败201--登入失败错误的信息
      if (result?.code === 200) {
        // pinia仓库存储token
        // pinia|vuex存储数据都是利用js对象，并非持久化
        this.token = result?.data
        // localStorage.setItem('TOKEN', result.data.token as string)
        SET_TOKEN(result.data)
        // 能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },

    // 拿token向服务器请求用户数据
    async getUserInfo() {
      // 获取用户信息进行存储【头像，用户名】
      const result = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.username
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },

    //退出登入
    async userLogout() {
      const result = await reqLogout()
      if (result?.code === 200) {
        //清除数据
        this.token = ''
        this.username = ''
        this.avatar = ''
        await REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result?.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
