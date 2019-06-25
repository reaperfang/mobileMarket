import request from '@/system/request'

/* 新的登录接口 */
export function login(data) {
  return request({
    target: 'MANAGER-API-100',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    target: '',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    target: '',
    method: 'post'
  })
}

