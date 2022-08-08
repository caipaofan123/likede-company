import request from '@/utils/request'

export const getOrderApi = (params) => {
  return request({
    url: '/api/order-service/order/search',
    params
  })
}
