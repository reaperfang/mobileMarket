import request from '@/system/request'


// 获取标签列表
export function fetchOrderList(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-PAGE-LIST-PROCESSOR',
    data
  })
}

// 订单详情
export function fetchOrderDetail(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-DETAIL-PROCESSOR',
    data
  })
}

// 订单导出
export function exportOrders(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-INFO-EXPORT-PROCESSOR',
    data
  })
}

// 订单发货列表
export function orderSendPageList(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDERSENDPAGELISTPROCESS',
    data
  })
}

// 售后单发货列表
export function SendPageList(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDERSENDPAGELISTPROCESS',
    data
  })
}



