import request from "@/utils/request";
// 创建工单
export function repairOperationApi() {
    return request({
        url: `/api/task-service/task/create`,
        method: 'post',


    })
}


// 获取工单详情
export function getOperationApi(taskId) {
    return request({
        url: `/api/task-service/task/taskInfo/${taskId}`,
        method: 'GET',


    })
}