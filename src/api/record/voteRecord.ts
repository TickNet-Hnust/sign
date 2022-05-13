/*
 * @Descipttion:
 * @Author: 刘晴
 * @Date: 2022-05-03 16:48:03
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-08 15:20:53
 */

import request from "~/utils/request";

// 获取所有发起投票记录
export function getVoteList(data: any) {
  return request({
    method: "get",
    url: "/signff/vote/list",
    params: data,
  });
}

// 获取投票详情
export function getDetailVote(id: any) {
  return request({
    method: "get",
    url: `/signff/voteRecord/${id}`,
  });
}

// 获取选中具体某个选项的学生列表
export function voteStuList(data: any) {
  return request({
    method: "get",
    url: "/signff/voteRecord/list",
    params: data,
  });
}
