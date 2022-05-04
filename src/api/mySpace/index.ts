import request from '~/utils/request'

// 条件查询空间
export function signSpaceList(data: any) {
  return request({
    method: 'get',
    url: '/sign/space/list',
    params: data,
  })
}
