import request from '@/utils/request'

// 获取全部商品类型
export const getskuClassApi = (params) => {
  return request({
    url: '/api/vm-service/skuClass/search',
    params
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
// 新增商品
export const addskuApi = (data) => {
  return request({
    url: '/api/vm-service/sku',
    method: 'POST',
    data
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
export const searchskuApi = (params) => {
  return request({
    url: '/api/vm-service/sku/search',
    params
  })
}

// 修改商品
export const putskuApi = (data) => {
  return request({
    url: `/api/vm-service/sku/${data.skuId}`,
    method: 'put',
    data
  })
}

// // 上传图片
// export const getImgUrlApi = (fileName) => {
//   return request({
//     url: '/api/vm-service/sku/fileUpload',
//     method: 'POST',
//     headers: { 'Content-Type': 'multipart/form-data' },
//     data: fileName
//   })
// }

/**
 * 图片上传
 * @param {*} fileName
 * @returns
 */
export function getImageUrlAPI(fileName) {
  return request({
    url: '/api/vm-service/sku/fileUpload',
    method: 'POST',
    data: fileName,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

