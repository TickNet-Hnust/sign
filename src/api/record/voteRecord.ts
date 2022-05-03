import request from '~/utils/request'

// 获取所有发起投票记录
export function getVoteList(data: any) {
  return request({
    method: 'get',
    url: '/signff/vote/list',
    params: data
  })
}