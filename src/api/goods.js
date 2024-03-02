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
