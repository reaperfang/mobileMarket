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

// 分类管理列表(分页)
export function getClassifyList(data) {
  return request({
    target: 'DECORATION-CATEGORYLIST-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 下拉分类列表
export function selectAllClassify(data) {
  return request({
    target: 'DECORATION-CATEGORY-SELECT-ALL-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 删除分类
export function deleteClassifys(data) {
  return request({
    target: 'DECORATION-CATEGORY-INFO-DELETE-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 启动广告列表
export function getADList(data) {
  return request({
    target: 'DECORATION-ADVERTISE-INFO-LIST-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 设为主页
export function setIndex(data) {
  return request({
    target: 'DECORATION-HOME-PAGE-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 删除页面
export function deletePages(data) {
  return request({
    target: 'DECORATION-BATCH-DELETE-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 复制页面
export function copyPage(data) {
  return request({
    target: 'DECORATION-PAGEINFO-COPY-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 获取页面数据
export function getPageInfo(data) {
  return request({
    target: 'DECORATION-FION-PAGE-INFO-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 创建页面
export function createPage(data) {
  return request({
    target: 'DECORATION-PAGE-INFO-INSERT-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 编辑页面数据
export function editPageInfo(data) {
  return request({
    target: 'DECORATION-PAGE-INFO-UPDATEP-ROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 获取分类数据
export function getClassifyInfo(data) {
  return request({
    target: 'DECORATION-CATEGORY-INFO-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 获取广告数据
export function getADInfo(data) {
  return request({
    target: 'DECORATION-ADVERTISE-INFO-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 创建广告
export function createAD(data) {
  return request({
    target: 'DECORATION-ADVERTISE-INFO-INSERT-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 编辑广告数据
export function editADInfo(data) {
  return request({
    target: 'DECORATION-ADVERTISE-INFO-UPDATE-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 启停广告
export function stopAndStopAD(data) {
  return request({
    target: 'DECORATION-ADVERTISE-INFO-UPDATE-STATUS-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 删除广告
export function deleteADs(data) {
  return request({
    target: 'DECORATION-ADVERTISE-INFO-BATCH-DELETE-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 获取店铺风格
export function getShopStyle(data) {
  return request({
    target: 'DECORATION-PAGE-COLOR-STYLE-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 设置店铺风格
export function setShopStyle(data) {
  return request({
    target: 'DECORATION-PAGE-COLOR-STYLE-SAVEP-ROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 获取商品分组页面数据
export function getGoodsGroup(data) {
  return request({
    target: 'DECORATION-PAGEINFO-COMMODITY-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 编辑商品分组页面数据
export function editGoodsGroup(data) {
  return request({
    target: 'DECORATION-PAGE-INFO-COMMODITY-INSERT-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 获取店铺导航数据
export function getShopNav(data) {
  return request({
    target: 'DECORATION-PAGE-NAVIGATION-CONFIG-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

// 编辑店铺导航数据
export function editShopNav(data) {
  return request({
    target: 'DECORATION-PAGE-NAVIGATION-CONFIG-SAVE-PROCESSOR',
    method: 'post',
    apiType: 'decorate',
    data
  })
}

