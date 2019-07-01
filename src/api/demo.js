import request from '@/system/request'


/********************************************************** demo  开始 ******************************************************/
// 获取列表
export function getList(data) {
  return request({
    url: '/admin/shop/all',
    method: 'post',
    baseURL: process.env.DATA_API,
    data
  })
}

