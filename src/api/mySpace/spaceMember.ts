import request from '~/utils/request'

// 查询空间成员
export function getSpaceMemberList(spaceId: number) {
  return request({
    method: 'get',
    url: '/sign/space/member/list',
    params: {
      spaceId,
    },
  })
}

// 改变成员权限
export function updateSpaceMember(data: any) {
  return request({
    method: 'put',
    url: '/sign/space/member',
    data,
  })
}
