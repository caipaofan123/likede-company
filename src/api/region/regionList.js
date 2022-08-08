import request from '@/utils/request'

/**
 * 获取区域列表
 * @param {Object} params pageIndex pageSize name 
 * @returns 
 */
export function getRegionListApi( pageIndex,pageSize,name) {
  return request({
    url: '/api/vm-service/region/search',
    method: 'get',
    params:{
      pageIndex,
      pageSize,
      name
    }
  })
}

/**
 * 新增区域
 * @param {String} regionName 区域名称
 * @param {String} remark 备注
 * @returns Promise
 */
export function addRegionApi(data) {
  return request({ 
    url: '/api/vm-service/region',
    method: 'POST',
    data
  })
}


export function delRegionApi(id) {
  return request({ 
    url: '/api/vm-service/region/'+id,
    method: 'DELETE',
  })
}


