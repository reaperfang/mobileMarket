import request from '@/system/request'

// 获取会员卡列表
export function getCardList(data) {
    return request({
      target:'CARD-LEVEL-INFO-FIND-PAGE-LIST-PROCESSOR',
      method: 'post',
      apiType: 'member',
      data
    })
}
//获取客户标签
export function getLabels(data) {
    return request({
        target:'MEMBER-LABEL-LIST-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}