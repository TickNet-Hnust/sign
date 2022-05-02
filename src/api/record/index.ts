import request from '~/utils/request'

// 获取全部记录
export function getTotalRecord() {
  return request({
    method: 'get',
    url: '/sign/record/total'
  })
}