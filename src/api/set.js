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

/* 店铺微信支付信息 */
export function getShopPayInfo(data) {
  return request({
    target: 'PAYMENT-106-PROCESSOR',
    method: 'post',
    apiType: 'pay',
    data
  })
}

/* 添加店铺微信支付信息 */
export function addShopPayInfo(data) {
  return request({
    target: 'PAYMENT-104-PROCESSOR',
    method: 'post',
    apiType: 'pay',
    data
  })
}

/* 更新店铺微信支付信息 */
export function updateShopPayInfo(data) {
  return request({
    target: 'PAYMENT-105-PROCESSOR',
    method: 'post',
    apiType: 'pay',
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

/* 设置店铺消息列表 */
export function setShopMessage(data) {
  return request({
    target: 'SHOP-API-108-PROCESSOR',
    method: 'post',
    apiType: 'manager',
    data
  })
}

/* 获取子账号列表 */
export function getSubAccount(data) {
  return request({
    target: 'MANAGER-API-102',
    method: 'post',
    apiType: 'manager',
    data
  })
}

/* 获取角色列表 */
export function getRoleList(data) {
  return request({
    target: 'MANAGER-API-110',
    method: 'post',
    apiType: 'manager',
    data
  })
}



