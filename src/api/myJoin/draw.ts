import request from '~/utils/request'

// 获取某个选项剩余的签数
export function getDrawNum(drawId: number) {
  return request({
    method: 'get',
    url: '/signff/draw',
    params: {
      drawId,
    },
  })
}

// 分页查询抽签人员记录
export function getDrawRecordList(drawId: number, pageNum: number, pageSize: number, optionCheckedValue: string, attend: number) {
  return request({
    method: 'get',
    url: '/signff/drawRecord/list',
    params: {
      drawId,
      pageNum,
      pageSize,
      optionId: optionCheckedValue,
      attend,
    },
  })
}

// 添加抽签记录
export function addDrawRecord(drawId: number) {
  return request({
    method: 'post',
    url: '/signff/drawRecord',
    data: {
      drawId,
    },
  })
}
