import request from '@/utils/request'

// 获取全部商品类型
export const getskuClassApi = () => {
  return request({
    url: '/api/vm-service/skuClass/search'
  })
}

// 删除商品类型
export const deleteskuClassApi = (classId) => {
  return request({
    url: `/api/vm-service/skuClass/${classId}`,
    method: 'DELETE'
  })
}

// 新增商品类型
export const addskuClassApi = (className) => {
  return request({
    url: '/api/vm-service/skuClass',
    method: 'POST',
    data: { className }
  })
}
// 修改商品类型
export const putskuClassApi = (data, className) => {
  return request({
    url: `/api/vm-service/skuClass/${data.classId}`,
    method: 'put',
    data: {
      className
    }
  })
}

// 搜索商品类型
export const searchskuClassApi = () => {
  return request({
    url: '/api/vm-service/skuClass/search'
  })
}

// 商品搜索
export const searchskuApi = (orderNo, pageIndex, pageSize = 10) => {
  return request({
    url: '/api/vm-service/sku/search',
    params: {
      orderNo,
      pageIndex,
      pageSize
    }
  })
}

// 上传图片
export const getImgUrlApi = (fileName) => {
  return request({
    url: '/api/vm-service/sku/fileUpload',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: fileName
  })
}
