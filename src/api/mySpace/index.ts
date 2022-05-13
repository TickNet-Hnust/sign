import request from "~/utils/request";

// 条件查询空间
export function signSpaceList(data: any) {
  return request({
    method: "get",
    url: "/sign/space/list",
    params: data,
  });
}

// 根据空间id查询空间详情
export function getSignSpace(spaceId: number) {
  return request({
    method: "get",
    url: `/sign/space/${spaceId}`,
  });
}

// 修改空间名称
export function updateSignSpace(data: any) {
  return request({
    method: "put",
    url: "/sign/space",
    data,
  });
}
// 面对面建群
export function addAFTFSpace(data: any) {
  return request({
    method: "post",
    url: "/sign/space/face_to_face_build_space",
    data,
  });
}

// 删除空间
export function deleteSignSpace(spaceId: number) {
  return request({
    method: "delete",
    url: "/sign/space",
    data: spaceId,
  });
}

// 退出空间
export function quitSignSpace(data: any) {
  return request({
    method: "delete",
    url: "/sign/space/member",
    data,
  });
}

// 获取空间活动记录
export function getRecord(spaceId: number) {
  return request({
    method: "get",
    url: "/sign/space/getRecord",
    params: {
      spaceId,
    },
  });
}
