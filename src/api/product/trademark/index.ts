//书写品牌管理模块接口

//品牌管理模块接口地址
import request from '@/utils/request.ts'
import { TradeMarkResponseData } from '@/api/product/trademark/type.ts'

enum API {
  //获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //添加品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  //修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  //删除已有品牌
  DELETE_URL = '/admin/product/baseTrademark/remove/',
}
//获取已有品牌的接口方法
//page:获取第几页 ---默认第一页
//limit:获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) => {
  return request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
}

//添加与修改已有品牌接口方法
export const reqAddOrUpdateTrademark = (data: any) => {
  //修改已有品牌的数据
  if (data.id) {
    return request.put(API.UPDATETRADEMARK_URL, data)
  } else {
    //新增品牌
    return request.post(API.ADDTRADEMARK_URL, data)
  }
}

//删除某一个已有品牌的数据
export const reqDeleteTrademark = (id: number) => {
  return request.delete(API.DELETE_URL + id)
}
