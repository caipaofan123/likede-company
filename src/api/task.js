import request from "@/utils/request";

export const searchTasks = () => {
  return request({
    url: "/api/task-service/task/search",
  });
};
