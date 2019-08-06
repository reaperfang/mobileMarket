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


