import request from '@/utils/request'

export const getskuClassApi = () => {
  return request({
    url: '/api/vm-service/skuClass/search'
  })
}

export const deleteskuClassApi = (classId) => {
  return request({
    url: '/api/vm-service/skuClass/' + 'classId',
    method: 'DELETE'
  })
}

export const addskuClassApi = () => {
  return request({
    url: '/api/vm-service/skuClass',
    method: 'POST'
  })
}
