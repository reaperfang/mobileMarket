// 财务相关接口
import request from '@/system/request'

//推客奖励 ------
export function getListTa(data) {
    return request({
      url: '/api/v1/b/recordMarketingPresent/detail-list',
      method: 'get',
      baseURL: process.env.DATA_API,
      params:data
    })
}

export function exportTa(data) {
    return request({
      url: '/api/v1/b/recordMarketingPresent/export',
      method: 'get',
      baseURL: process.env.DATA_API,
      params:data
    })
}

export function statisticsTa(data) {
    return request({
      url: '/api/v1/b/recordMarketingPresent/statistics',
      method: 'get',
      baseURL: process.env.DATA_API,
      params:data
    })
}

//营收状况 ------
export function getSurveyDayRs(data) {
    return request({
      target: 'FINANCIAL-REVENUE-SUM-TODAY-PROCESSOR',
      method: 'post',
      apiType: 'finance',
      data
    })
}

export function getDataDateRs(data) {
    return request({
      target: 'FINANCIAL-REVENU-TIMESLOT-LIST-PROCESSOR',
      method: 'post',
      apiType: 'finance',
      data
    })
}

export function getDataNumRs(data) {
    return request({
      target: 'FINANCIAL-REVENUE-RECENT-LIST-PROCESSOR',
      method: 'post',
      apiType: 'finance',
      data
    })
}

//收支明细 -------
export function getListRe(data) {
    return request({
      target: 'FINANCIAL-TRADE-RECORD-PAGE-PROCESSOR',
      method: 'post',
      apiType: 'finance',
      data
    })
}

export function exportTaRe(data) {
    return request({
      target: 'FINANCIAL-TRADE-EXPORT-PROCESSOR',
      method: 'post',
      apiType: 'finance',
      data
    })
}









