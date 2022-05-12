/*
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-05-01 20:32:16
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-12 16:40:35
 */
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

// 获取辅助签到二维码
export function signQRCode(data: any) {
  return request({
    method: 'get',
    url: '/signff/sign/QRCode',
    params: data
  })
}

// 签到
export function sign(data: any) {
  return request({
    method: 'post',
    url: '/signff/signRecord',
    data: data
  })
}

// 查询空间活动记录
export function getRecord(data: any) {
  return request({
    method: 'get',
    url: '/sign/space/getRecord',
    params: data
  })
}