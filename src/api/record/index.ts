/*
 * @Descipttion: 
 * @Author: 刘晴
 * @Date: 2022-05-01 20:32:16
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-28 17:27:36
 */
import request from '~/utils/request'
import qs from 'qs'

// 获取全部记录 暂时没有
export function getTotalRecord() {
  return request({
    method: 'get',
    url: '/sign/record/total'
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
export function signByQRCode(data: any) {
  return request({
    method: 'post',
    url: '/signff/signRecord/ByQRCode',
    data: data
  })
}

// 学号姓名辅助签到
export function signByUser(data: any) {
  return request({
    method: 'post',
    url:'/signff/signRecord/ByUser',
    data: data
  })
}

// 查询空间签到记录
export function spaceSignRecord(data: any) {
  return request({
    method: 'get',
    url: '/sign/space/getStatistics' + '?' + qs.stringify(data, { arrayFormat: 'repeat' })
  })
}

// 查询某空间发起过的签到列表
export function spaceSignList(data: any) {
  return request({
    method: 'get',
    url: '/sign/space/signList',
    params: data
  })
}

// 获取空间二维码
export function spaceQRcode(data: any) {
  return request({
    method: 'get',
    url: '/sign/space/QRCode',
    params: data
  })
}

// 二维码入群
export function enterSpaceByCode(data: any) {
  return request({
    method: 'post',
    url: '/sign/space/member/enterSpaceByCode',
    data: data
  })
}

// 新建投票
export function newVote(data: any) {
  return request({
    method: 'post',
    url: '/signff/vote',
    data: data
  })
}

// 获取某空间可能存在的班级
export function spaceDeptList(data: any) {
  return request({
    method: 'get',
    url: '/sign/space/deptList',
    params: data
  })
}

// 查询单次签到统计
export function getStatistics(data: any) {
  return request({
    method: 'get',
    url: '/signff/sign/getStatistics' + '?' + qs.stringify(data, { arrayFormat: 'repeat' })
  })
}

// 查询单次签到可能存在的班级
export function signDeptList(data: any) {
  return request({
    method: 'get',
    url: '/signff/sign/deptList',
    params: data
  })
}