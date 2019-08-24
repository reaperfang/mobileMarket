import request from '@/system/request'

/* 获取店铺信息 */
export function getShopInfo(data) {
  return request({
    target: 'SHOP-API-100-PROCESSOR',
    method: 'post',
    apiType: 'manager',
    data
  })
}

/* 更新店铺信息 */
export function updateShopInfo(data) {
  return request({
    target: 'SHOP-API-102-PROCESSOR',
    method: 'post',
    apiType: 'manager',
    data
  })
}

/* 获取店铺消息列表 */
export function getShopMessage(data) {
  return request({
    target: 'SHOP-API-107-PROCESSOR',
    method: 'post',
    apiType: 'manager',
    data
  })
}



