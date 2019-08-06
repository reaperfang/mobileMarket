// 财务相关接口
import request from '@/system/request'

//推客奖励
export function getList(data) {
    return request({
      url: '/recordMarketingPresent/detailList',
      method: 'get',
      apiType:'market',
      baseURL: process.env.DATA_API,
      data
    })
  }