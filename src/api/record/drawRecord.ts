import request from "~/utils/request";

// 获取抽签记录
export function getDrawList(data: any) {
  return request({
    method: "get",
    url: "signff/draw/list",
    params: data,
  });
}
// 获取单条抽签记录详情
export function getDetailDraw(id: any) {
  return request({
    method: "get",
    url: `/signff/draw/${id}`,
  });
}
// 获取具体抽到某个签的学生记录
export function drawStuList(data: any) {
  return request({
    method: "get",
    url: "/signff/drawRecord/list",
    params: data,
  });
}

// 获取已经抽签的人数
export function drawRecordCount(id: any) {
  return request({
    method: "get",
    url: `/signff/drawRecord/count/${id}`,
  });
}
