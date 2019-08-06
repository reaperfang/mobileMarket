// 店铺相关接口
import request from '@/system/request'


/********************************************************** demo  开始 ******************************************************/
// 页面管理&草稿箱列表(分页)
export function getPageList(data) {
  return request({
    target: 'DECORATION-PAGE-INFO-LIST-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}


