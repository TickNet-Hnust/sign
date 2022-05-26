import request from '~/utils/request'

// 登录测试
export function loginTest() {
  return request({
    method: 'get',
    url: '/login/test1',
  })
}

export function login(code: string) {
  return request({
    method: 'post',
    url: '/login',
    params: {
      code,
    },
  })
}
