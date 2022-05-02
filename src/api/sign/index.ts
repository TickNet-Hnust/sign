import request from '~/utils/request'

// 分页查询签到发起记录
export function pageSign(data: any) {
  return request({
    method: 'get',
    url: 'signff/sign/list',
    params: data
  })
}