import request from "@/utils/request";

export function getPeopleList() {
  return request({
    url: "/api/user-service/user/search",
    method: "GET",
  });
}
