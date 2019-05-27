import request from '@/utils/request'

export const getBusinesses = (params) => {
  return request({
    url: '/business',
    method: 'get',
    params
  })
}
