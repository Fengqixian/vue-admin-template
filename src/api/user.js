import request from '@/utils/request'

export function wechatLoginCode() {
  return request({
    url: '/wechat/login/qr/code',
    method: 'get'
  })
}

export function login(loginCode) {
  return request({
    url: '/wechat/login/check/' + loginCode,
    method: 'get'
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
