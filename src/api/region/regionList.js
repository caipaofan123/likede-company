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


/**
 * 删除区域
 * @param {String} id 区域id
 * @returns 
 */
export function delRegionApi(id) {
  return request({ 
    url: '/api/vm-service/region/'+id,
    method: 'DELETE',
  })
}

/**
 * 修改区域
 * @param {String} id 区域id
 * @returns 
 */
export function changeRegionApi(id,data) {
  return request({ 
    url: '/api/vm-service/region/'+id,
    method: 'PUT',
    data
  })
}

/**
 * 获取区域详情
 * @param {String} id 区域id
 * @returns 
 */
export function getRegionDetailApi(id) {
  return request({ 
    url: '/api/vm-service/node/vmList/'+id,
  })
}



