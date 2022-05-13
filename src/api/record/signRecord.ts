/*
 * @Descipttion:
 * @Author: 刘晴
 * @Date: 2022-05-03 14:25:10
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-08 15:11:28
 */
import request from "~/utils/request";
// 获取签到记录
export function getSignList(data: any) {
  return request({
    method: "get",
    url: "/signff/sign/list",
    params: data,
  });
}
// 获取签到详情信息
export function detailSignRecord(id: any) {
  return request({
    method: "get",
    url: `/signff/sign/${id}`,
  });
}
// 获取签到学生列表
export function signStuList(data: any) {
  return request({
    method: "get",
    url: "/signff/signRecord/list",
    params: data,
  });
}

// 辅助签到
export function assistSignIn(data: any) {
  return request({
    method: "post",
    url: "/signff/sign/assistSignIn",
    data: data,
  });
}

// 修改签到信息
export function changeSignMsg(data: any) {
  return request({
    method: "put",
    url: "/signff/sign",
    data: data,
  });
}
