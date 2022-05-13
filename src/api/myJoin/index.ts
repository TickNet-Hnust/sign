import request from "~/utils/request";

// 我的参与界面接口

// 分页查询签到发起记录
export function signList(params: any) {
  return request({
    method: "get",
    url: "/signff/sign/list",
    params,
  });
}

// 分页查询投票发起记录
export function voteList(params: any) {
  return request({
    method: "get",
    url: "/signff/vote/list",
    params,
  });
}

// 分页查询抽签发起记录
export function drawList(params: any) {
  return request({
    method: "get",
    url: "/signff/draw/list",
    params,
  });
}
