import request from '@/system/request'


/********************************************************** 概况 js ******************************************************/
// 概况详情首页
export function overviewDetails(data) {
  return request({
    target: 'SHOP-OVERVIEW-PROCESSOR',
    method: 'get',
    baseURL: process.env.DATA_API,
    params
  })
}
   