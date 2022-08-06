import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/api/user-service/user/login",
    method: "POST",
    data
  });
}
export function getCode(clientToken) {
  return request({
    url: `/api/user-service/user/imageCode/${clientToken}`,
  });
}
export function getUserInfo(id) {
  return request({
      url: `/api/user-service/user/${id}`,
  })
}

export function logout() {}
