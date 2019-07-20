import request from '@/system/request'


// 获取列表
export function fetchList(data) {
  return request({
    url: '',
    method: '',
    baseURL: process.env.DATA_API,
    data
  })
}


