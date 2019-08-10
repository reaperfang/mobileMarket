import request from '@/system/request'


// 获取商品类目列表
export function fetchCategoryList(data) {
  return request({
    apiType: 'goodsOperate',
    method: 'post',
    target: 'PUBLIC-CATEGORY-LIST-PROCESSOR',
    data
  })
}

// 获取单位计量列表
export function fetchUnitList(data) {
    return request({
      apiType: 'goodsOperate',
      method: 'post',
      target: 'PUBLIC-UNIT-LIST-PROCESSOR',
      data
    })
  }

  // 获取品牌管理列表
export function fetchBrandList(data) {
    return request({
        apiType: 'goodsOperate',
        method: 'post',
        target: 'PUBLIC-BRAND-PAGELIST',
        data
    })
}

// 获取商品规格列表
export function fetchSpecsList(data) {
    return request({
      apiType: 'goodsOperate',
      method: 'post',
      target: 'PUBLICPRODUCTSPECSDETAILLISTPROCESSOR',
      data
    })
  }
