import request from '@/utils/request'

export function wechatPageList() {
  return request({
    url: '/page/list',
    method: 'get'
  })
}

export function wechatPagePV(pageId) {
  return request({
    url: '/page/pv/' + pageId,
    method: 'get'
  })
}

export function wechatPageUV(pageId) {
  return request({
    url: '/page/uv/' + pageId,
    method: 'get'
  })
}

export function pageView(pageId) {
  return request({
    url: '/page/view/' + pageId,
    method: 'get'
  })
}
