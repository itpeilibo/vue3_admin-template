//统一管理咱们项目用户相关的接口
import request from '@/utils/request.ts'
import type {
  loginResponseData,
  loginFormData,
  userInfoResponseData,
} from '@/api/user/type.ts'

// 统一管理
enum API {
  // LOGIN_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/index/login',
  LOGIN_URL = '/admin/acl/index/login',

  USERINFO_URL = '/admin/acl/index/info',

  LOGOUT_URL = '/admin/acl/index/logout',
}

// 暴露请求函数
// 登录接口方法
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

// 获取用户信息接口方法
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
