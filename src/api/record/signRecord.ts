import request from '~/utils/request'
// 获取签到记录
export function getSignList(data:any) {
  return  request({
    method: 'get',
    url: '/signff/sign/list',
    params: data
  })
}
// 获取签到记录详情
export  function detailSignRecord(data: any) {
  return request({
    method: 'get',
    url: '/signff/signRecord/list',
    params: data
  })
}

// 辅助签到
export function assistSignIn(data: any) {
  request({
    method: 'post',
    url: '/signff/sign/assistSignIn',
    data: data
  })
}