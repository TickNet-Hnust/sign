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

// 查询当前投票名单
export function getVoteRecordList(voteId: number, pageNum: number, pageSize: number) {
  return request({
    method: 'get',
    url: '/signff/voteRecord/list',
    params: {
      voteId,
      pageNum,
      pageSize,
    },
  })
}
