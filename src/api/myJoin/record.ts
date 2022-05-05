import request from '~/utils/request'

// 各个具体活动记录接口

// 查询投票纪录
export function voteRecord(voteId: number) {
  return request({
    method: 'get',
    url: `/signff/voteRecord/${voteId}`,
  })
}

// 查询抽签记录
export function getDraw(drwaId: number) {
  return request({
    method: 'get',
    url: `/signff/draw/${drwaId}`,
  })
}
