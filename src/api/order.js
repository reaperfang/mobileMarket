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


