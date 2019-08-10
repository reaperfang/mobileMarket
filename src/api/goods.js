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

// 获取标签列表(不分页)
export function fetchAllTagsList(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-LABEL-PAGE-LIST-PROCESSOR',
    data
  })
}

// 添加标签
export function addTag(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-LABEL-NEW-PROCESSOR',
    data
  })
}

// 商品标签删除(批量删除)
export function deleteTag(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-LABEL-DELETE-PROCESSOR',
    data
  })
}

// 商品标签删除(批量删除)
export function enableTag(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-LABEL-ENABLE-PROCESSOR',
    data
  })
}


// 商品标签修改
export function editorTag(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-LABEL-UPDATE-PROCESSOR',
    data
  })
}

// 商品分类列表
export function fetchCategoryList(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-CATALOG-LIST-PROCESSOR',
    data
  })
}

// 商品分类详情
export function getCategoryDetail(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-CATALOG-DETAIL-PROCESSOR',
    data
  })
}

// 商品分类添加
export function addCategory(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-CATALOG-NEW-PROCESSOR',
    data
  })
}

// 商品分类修改
export function editorCategory(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-CATALOG-EDIT-PROCESSOR',
    data
  })
}

// 商品分类删除
export function deleteCategory(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-CATALOG-DELETE-PROCESSOR',
    data
  })
}

// 商品分类启用或禁用
export function enableCategory(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-CATALOG-ENABLE-PROCESSOR',
    data
  })
}

// sku商品分页列表
export function fetchGoodsList(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-SKU-PAGE-LIST-PROCESSOR',
    data
  })
}

// 新增商品
export function addGoods(data) {
  return request({
    apiType: 'goods',
    method: 'post',
    target: 'PRODUCT-NEW-PROCESSOR',
    data
  })
}




