import request from '@/utils/request'

export function getFileUploadToken() {
  return request({
    url: '/file/upload/token',
    method: 'post'
  })
}

export function uploadResourceInfo(data) {
  return request({
    url: '/file/upload/resource',
    method: 'post',
    data
  })
}

export function manageUserList(data) {
  return request({
    url: '/manage/user/list',
    method: 'post',
    data
  })
}

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
