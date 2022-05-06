import request from '~/utils/request'

// 条件查询空间
export function signSpaceList(data: any) {
  return request({
    method: 'get',
    url: '/sign/space/list',
    params: data,
  })
}

// 根据空间id查询空间详情
export function getSignSpace(spaceId: number) {
  return request({
    method: 'get',
    url: `/sign/space/${spaceId}`,
  })
}
