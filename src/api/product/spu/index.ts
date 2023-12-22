//SPU管理模块的接口

import request from '@/utils/request.ts'
import { HasSpuResponseData } from '@/api/product/spu/type.ts'

enum API {
  //获取已有的SPU的数据
  HASSPU_URL = '/admin/product/',

  // //获取全部品牌的数据
  // ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  //
  // //获取某个SPU下的全部的售卖商品的图片数据
  // IMAGE_URL = '/admin/product/spuImageList/',
}

//获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number,
) => {
  return request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
}

//获取全部的SPU的品牌的数据
// export const reqAllTradeMark = () => {
//   return request.get<any, any>(API.ALLTRADEMARK_URL)
// }
