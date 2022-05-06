import request from '~/utils/request'

// 获取全部记录 暂时没有
export function getTotalRecord() {
  return request({
    method: 'get',
    url: '/sign/record/total'
  })
}
// 辅助签到
export function assistSignIn(data: any) {
  return request({
    method: 'post',
    url: '/signff/sign/assistSignIn',
    data: data
  })
}