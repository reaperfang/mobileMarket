import request from '@/system/request'

/* 新的登录接口 */
export function login(data) {
  return request({
    target: 'MANAGER-API-100',
    method: 'post',
    apiType: 'manager',
    data
  })
}

export function logout() {
  return request({
    target: 'MANAGER-API-101',
    method: 'post'
  })
}

export function getUserInfo(data) {
  return request({
    target: 'MANAGER-API-105',
    method: 'post',
    apiType: 'manager',
    data
  })
}

