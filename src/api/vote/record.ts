import request from '~/utils/request'

// 投票统计记录
export function getVoteRecord(voteid: string) {
  return request({
    method: 'get',
    url: 'signff/vote',
    params: {
      voteid,
    },
  })
}

// 新增投票记录
export function addVoteRecord(data: any) {
  return request({
    method: 'post',
    url: '/signff/voteRecord',
    params: data,
  })
}
