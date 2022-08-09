import request from "@/utils/request";

/**
 * 人员搜索(列表页)
 * @returns
 */
export function getPeopleList() {
  return request({
    url: "/api/user-service/user/search",
    method: "GET",
  });
}

/**
 * 角色列表
 * @returns
 */
export function getPeopleRoleList() {
  return request({
    url: "/api/user-service/role",
    method: "GET",
  });
}
/**
 * 区域列表
 * @returns
 */
export function getAreaList(params) {
  return request({
    url: "/api/vm-service/region/search",
    method: "GET",
    params,
  });
}

export function getImageUrlAPI(fileName) {
  return request({
    url: "/api/vm-service/sku/fileUpload",
    method: "POST",
    data: fileName,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
