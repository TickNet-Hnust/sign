import request from '~/utils/request'

// 获取抽签记录
export function getDrawList(data: any) {
  return request({
    method: 'get',
    url: 'signff/draw/list',
    params: data
  })
}