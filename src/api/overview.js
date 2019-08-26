import request from '@/system/request'


/********************************************************** 概况 js ******************************************************/
// 概况详情首页
export function overviewDetails(data) {
  return request({
    target: 'CUSTOMER-SHOPX-OVERVIEWX-DATA-PROCESSOR',
    method: 'post',
    apiType: 'data',
    data
  })
}
// 代办提醒 
export function overviewRemind(data) {
    return request({
      target: 'ORDER-REMIND-PROCESSOR',
      method: 'post',
      apiType: 'data',
      data
    })
  }

   