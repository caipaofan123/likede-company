import request from '@/utils/request'

export function searchNodeApi(params,dataObj) {
    return request({
      url:'/api/vm-service/node/search',
      params,
      data:dataObj
    })
  }

//   添加点位
  export function addNodeApi(data) {
    return request({
      url:'/api/vm-service/node',
      method:"POST",
      data
    })
  }
  

//   获取点位详情
  export function NodeDetailApi(id) {
    return request({
      url:'/api/vm-service/node/vmList/'+id,
    })
  }

// 删除点位
  export function deleteNodeApi(id) {
    return request({
      url:'/api/vm-service/node/'+id,
      method:"DELETE"
    })
  }

  // 修改点位
  export function changeNodeApi(id,data) {
    return request({
      url:'/api/vm-service/node/'+id,
      method:"PUT",
      data
    })
  }