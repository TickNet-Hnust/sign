import request from '~/utils/request'

// 新建抽签
export function draw(data: any) {
  return request({
    method: 'post',
    url: '/signff/draw',
    data,
  })
}

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
      optionName: optionCheckedValue,
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

// 修改抽签信息
export function modifyDraw(drawId: number, duration: number, anonymity: number) {
  return request({
    method: 'put',
    url: '/signff/drawRecord',
    data: {
      drawId,
      duration,
      anonymity,
    },
  })
}

// 获取已经抽签的人数
export function drawRecordCount(drawId: number) {
  return request({
    method: 'get',
    url: '/signff/drawRecord/count',
    params: {
      drawId,
    },
  })
}
