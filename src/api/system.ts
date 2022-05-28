import request from '~/utils/request'

// 登录测试
export function loginByTest() {
  return request({
    method: 'get',
    url: '/login/test1',
  })
}

export function loginByCode(code: string) {
  return request({
    method: 'post',
    url: '/login',
    params: {
      code,
    },
  })
}
