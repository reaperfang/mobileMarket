// 文件相关接口
import request from '@/system/request'


// 获取素材列表(分页)
export function getMaterialList(data) {
  return request({
    target: 'DECORATION-MY-FILE-LIST-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

