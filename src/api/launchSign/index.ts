/*
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2022-05-02 18:52:59
 * @LastEditors: 张津瑞
 * @LastEditTime: 2022-05-03 17:27:37
 */
import request from '~/utils/request'

// 发起签到
export function sign(data:any) {
  return request({
    method: 'post',
    url: '/signff/sign',
    data:data
  })
}

//条件查询签到记录
export function signRecordList(data:any) {
  return request({
    method: 'get',
    url: '/signff/signRecord/list',
    params:data
  })
}

//签到
export function signRecord(data:any) {
  return request({
    method: 'post',
    url: '/signff/signRecord',
    data:data
  })
}