import request from "@/utils/request";

/**
 * 
 * @param {Object} params query
 * @returns promise
 */
export function searchTasks(params) {
    return request({
        url: '/api/task-service/task/search',
        params
    })
}

/**
 * 工单状态列表
 * @returns promise
 */
export function getTaskStatus() {
    return request({
        url: "/api/task-service/task/allTaskStatus",
    });
}


/**
 * 获取补货预警值
 * @returns 
 */

export function getOrderApi() {
    return request({
        url: '/api/task-service/task/supplyAlertValue',
        method: 'get',
    })
}
/**
 * 自动补货工单阈值
 * @returns 
 */
export function getReplenishApi(data) {
    return request({
        url: '/api/task-service/task/autoSupplyConfig',
        method: 'post',
        data,

    })
}
