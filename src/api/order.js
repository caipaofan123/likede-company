import request from '@/utils/request'

export const getOrderApi = (orderNo, pageIndex, startDate, endDate) => {
  return request({
    url: '/api/order-service/order/search',
    params: {
      orderNo,
      pageIndex,
      startDate,
      endDate
    }
  })
}
