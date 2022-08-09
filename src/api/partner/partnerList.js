import request from '@/utils/request'

/**
 * 获取合作商列表
 * @param {Object} params pageIndex pageSize name 
 * @returns 
 */
export function getPartnerListApi( pageIndex,pageSize,name) {
  return request({
    url: '/api/user-service/partner/search',
    method: 'get',
    params:{
      pageIndex,
      pageSize,
      name
    }
  })
}

/**
 * 新增合作商
 * @param {Object} data 请求参数
 * @returns 
 */
export function addPartnerApi(data) {
    return request({
      url: '/api/user-service/partner',
      method: 'POST',
      data
    })
  }

// 修改合作商
  export function changePartnerApi(data,id) {
    return request({
      url: '/api/user-service/partner/'+id,
      method: 'PUT',
      data
    })
  }

  // 重置密码
  export function resetPwdApi(id) {
    return request({
      url: '/api/user-service/partner/resetPwd/'+id,
      method: 'PUT'
    })
  }

  // 删除合作商
  export function deletePartnerApi(id) {
    return request({
      url: '/api/user-service/partner/'+id,
      method: 'DELETE'
    })
  }