import request from '@/utils/request'

export function manageGoodsList(data) {
  return request({
    url: '/manage/goods/list',
    method: 'post',
    data
  })
}

export function createGoods(data) {
  return request({
    url: '/manage/goods/create',
    method: 'post',
    data
  })
}

export function updateGoods(data) {
  return request({
    url: '/manage/goods/update',
    method: 'post',
    data
  })
}

export function updatePublishState(id, state) {
  return request({
    url: '/manage/goods/publish/' + id + '/' + state,
    method: 'post'
  })
}
