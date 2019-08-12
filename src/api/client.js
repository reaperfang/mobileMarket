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
//会员卡管理-发卡
export function sendCard(data) {
    return request({
        target:'RECEIVE-CARD-RECORD-SEND-CARD-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//会员卡管理-启用/禁用
export function toggleStatus(data) {
    return request({
        target:'CARD-LEVEL-INFO-STATUS-EDIT-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//会员卡管理-等级权益列表信息
export function getRightsList(data) {
    return request({
        target:'RIGHTS-LIST-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//会员卡管理-下拉列表
export function getCardNames(data) {
    return request({
        target:'CARD-LEVEL-INFO-FIND-LIST-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//客户渠道下拉
export function getChannels(data) {
    return request({
        target:'MEMBER-SOURCECHANNELLIST-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//客户列表
export function getMemberList(data) {
    return request({
        target:'MEMBER-INFO-LIST-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//删除客户
export function deleteMember(data) {
    return request({
        target:'MEMBER-INFO-DEL-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//打标签
export function markLabel(data) {
    return request({
        target:'MEMBER-INFO-MARKLABEL-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//批量删除
export function batchDeleteMember(data) {
    return request({
        target:'MEMBER-INFO-DEL-BATCH-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//批量打标签
export function batchMarkLabel(data) {
    return request({
        target:'MEMBER-INFO-MARKLABELBATCH-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//获取客户详情
export function getMemberInfo(data) {
    return request({
        target:'MEMBER-INFO-DETAIL-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//客户个人资料保存
export function saveMemberInfo(data) {
    return request({
        target:'MEMBERINFO-PERSONALDATA-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//等级-下拉列表
export function getLevelList(data) {
    return request({
        target:'LEVEL-LIST-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//变换客户身份
export function identityChange(data) {
    return request({
        target:'MEMBERINFO-IDENTITYCHANGE-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//变换会员卡
export function cardChange(data) {
    return request({
        target:'MEMBERINFO-GRANTCARD-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//取消手动标签
export function removeLabel(data) {
    return request({
        target:'MEMBERINFO-CANCELLABEL-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//标签列表
export function getLabelList(data) {
    return request({
        target:'MEMBER-LABEL-PAGE-LIST-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//标签添加
export function addTag(data) {
    return request({
        target:'MEMBER-LABEL-ADD-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//标签详情
export function getLabelInfo(data) {
    return request({
        target:'MEMBER-LABEL-DETAIL-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//标签编辑
export function updateTag(data) {
    return request({
        target:'MEMBER-LABEL-UPDATE-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//批量删除标签
export function batchDeleteTag(data) {
    return request({
        target:'MEMBER-LABEL-BATCH-DELETE-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//等级分页查询
export function getLevelsList(data) {
    return request({
        target:'LEVEL-PAGE-LIST-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//获取等级详情
export function getLevelsInfo(data) {
    return request({
        target:'LEVEL-DETAIL-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//升级条件列表
export function levelConditionList(data) {
    return request({
        target:'LEVEL-CONDITION-LIST-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//升级奖励列表
export function getRewardList(data) {
    return request({
        target:'UPGRADE-REWARD-LIST-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//余额明细表
export function getBalanceList(data) {
    return request({
        target:'FINANCIAL-BALANCE-PAGELIST-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//手动变更余额
export function manualChangeBalance(data) {
    return request({
        target:'MEMBER-INFOBALANCE-ADJUSTMENT-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//手动变更积分
export function manualChangeCredit(data) {
    return request({
        target:'MEMBER-INFO-SCOREADJUSTMENT-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}
//获取优惠券列表
export function getCouponList(data) {
    return request({
        url: '/api/v1/c/app-coupon-member-get',
        method: 'get',
        baseURL: process.env.DATA_API,
        params:data
    })
}
//获取优惠券下拉
export function getAllCoupons(data) {
    return request({
        url: '/api/v1/b/app-coupon/activity/page-list',
        method: 'get',
        baseURL: process.env.DATA_API,
        params:data
    })
}
//优惠券/码发放
export function distributeCoupon(data) {
    return request({
        url: '/api/v1/b/app-coupon-member-get/activity/distribute',
        method: 'post',
        baseURL: process.env.DATA_API,
        params:data
    })
}
//导入客户记录列表
export function importMemberList(data) {
    return request({
        target:'MEMBER-IMPORTRECORD-LIST-PROCESSOR',
        method: 'post',
        apiType: 'member',
        data
    })
}