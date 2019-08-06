import request from '@/system/request'


// 获取标签列表
export function fetchTagsList(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-LABEL-PAGE-LIST-PROCESSOR',
    data
  })
}


