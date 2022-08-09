import request from '@/utils/request'
// 策略列表
export function gePolicyApi() {
    return request({
        url: '/api/vm-service/policy/search',
        method: 'get',

    })
}
//  /api/vm-service/policy/
export function CreatePolicyApi(data, policyName, discount) {
    return request({
        url: `/api/vm-service/policy/${data.policyId}`,
        method: 'PUT',
        data: {
            policyName,
            discount
        }
    })
}
// 删除策略

export function deletePolicyApi(policyId) {
    return request({
        url: `/api/vm-service/policy/${policyId}`,
        method: 'DELETE',

    })
}

// 根据策略搜索售货机
export function lookPolicyApi(policyId) {
    return request({
        url: `/api/vm-service/policy/vmList/${policyId}`,
        method: 'GET',

    })
}
// 新增策略
export function addPolicyApi(data) {
    return request({
        url: `/api/vm-service/policy`,
        method: 'Post',
        data

    })
}

// 搜索策略
export function searchPolicyApi(policyName, pageIndex) {
    return request({
        url: `/api/vm-service/policy/search`,
        method: 'get',
        params: {
            policyName,
            pageIndex,
        
        }

    })
}