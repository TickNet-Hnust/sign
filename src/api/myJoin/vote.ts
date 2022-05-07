import request from '~/utils/request'

// 新增投票纪录
export function addVoteRecord(voteId: number, voteOption: Array<string>) {
  return request({
    method: 'post',
    url: '/signff/voteRecord',
    data: {
      voteId,
      voteOption,
    },
  })
}
