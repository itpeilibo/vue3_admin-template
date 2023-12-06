//统一管理咱们项目用户相关的接口
import request from '@/utils/request.ts'
import type {
  loginForm,
  loginResponseData,
  userResponseData,
} from '@/api/user/type.ts'

// 统一管理
enum API {
  LOGIN_URL = '/user/login',

  USERINFO_URL = '/admin/acl/index/info',

  LOGOUT_URL = '/admin/acl/index/logout',
}

// 暴露请求函数
// 登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

// 获取用户信息接口方法
export const reqUserInfo = () => request.get<userResponseData>(API.USERINFO_URL)
