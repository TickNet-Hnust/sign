import request from '~/utils/request'

// 获取抽签记录
export function getDrawList(data: any) {
  return request({
    method: 'get',
    url: 'signff/draw/list',
    params: data
  })
}
// 获取单条抽签记录详情
export function getDetailDraw(id: any) {
  return request({
    method: 'get',
    url: `/signff/draw/${id}`
  })
}