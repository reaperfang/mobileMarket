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

// 订单确认收款
export function makeCollections(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-INFO-RECEIVE-MONEY-PROCESSOR',
    data
  })
}

// 订单关闭
export function orderClose(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-CLOSE-PROCESSOR',
    data
  })
}

// 订单备注--商家备注
export function orderRemark(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-SELLER-ADD-REMARK-PROCESSOR',
    data
  })
}

// 订单收货信息--商家修改
export function orderUpdateReceive(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-UPDATE-RECEIVED-PROCESSOR',
    data
  })
}

// 订单改价
export function orderPriceChange(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-PRICE-CHANGE-PROCESSOR',
    data
  })
}

// 评论列表查询（分页）
export function getCommentList(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-PRODUCT-COMMENT-PAGE-LIST-PROCESSOR',
    data
  })
}

// 查看评论详情
export function getCommentInfo(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-PRODUCT-COMMENT-INFO-PROCESSOR',
    data
  })
}

// 回复 / 批量回复
export function replyComment(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-PRODUCT-COMMENT-REPLYP-ROCESSOR',
    data
  })
}

// 设为/取消精选
export function setChoiceness(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-PRODUCT-COMMENT-CHOICENESS-PROCESSOR',
    data
  })
}

// 审核 / 批量审核
export function orderCommentAuth(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-PRODUCT-COMMENT-AUTH-PROCESSOR',
    data
  })
}

//  商家自定义敏感词列表查询
export function getSensitiveWordList(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'SENSITIVE-WORD-LIST-PROCESSOR',
    data
  })
}

//  商家自定义敏感词删除
export function deleteSensitiveWord(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'SENSITIVE-WORD-DELETE-PROCESSOR',
    data
  })
}

//  商家自定义敏感词添加
export function addSensitiveWord(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'SENSITIVE-WORD-ADD-PROCESSOR',
    data
  })
}

//  售后单列表
export function getOrderAfterSalePageList(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-AFTER-SALE-PAGE-LIST-PROCESSOR',
    data
  })
}

//  售后单详情
export function getOrderAfterSaleDetail(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-AFTER-SALE-INFO-PROCESSOR',
    data
  })
}

//  审核/批量审核
export function orderAfterSaleUpdateStatus(data) {
  return request({
    apiType: 'order',
    method: 'post',
    target: 'ORDER-AFTER-SALE-UPDATE-STATUS-PROCESSOR',
    data
  })
}






