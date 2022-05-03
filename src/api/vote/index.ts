import request from '~/utils/request'

// 新建投票
export function createVote() {
  return request({
    method: 'post',
    url: '/signff/vote',
  })
}

// 获取投票详情
export function getVoteDeatil(id: string) {
  return request({
    method: 'get',
    url: `signff/vote/${id}`,
  })
}

// 获取所有投票
export function getAllVote(voteId: number) {
  return request({
    method: 'get',
    url: 'signff/vote/list',
    params: {
      voteId,
    },
  })
}

// 修改已存在的投票时间
export function reviseVoteTime() {
  return request({
    method: 'put',
    url: 'signff/vote',
  })
}
