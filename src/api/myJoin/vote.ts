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
export function getVoteRecordList(voteId: number, pageNum: number, pageSize: number, attend: number) {
  return request({
    method: 'get',
    url: '/signff/voteRecord/list',
    params: {
      voteId,
      pageNum,
      pageSize,
      attend,
    },
  })
}

// 修改投票时间
export function modifyVoteTime(voteId: number, endTime: string) {
  return request({
    method: 'put',
    url: '/signff/vote',
    data: {
      id: voteId,
      endTime,
    },
  })
}
