import request from "@/utils/request";

export const getTask = () => {
    return request({
        url: '/api/task-service/task/search'
    })
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
        method: post,
        data,

    })
}