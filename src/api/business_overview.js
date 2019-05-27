import request from '@/utils/request'

export const getBusinessOverview = (params) => {
  return request({
    url: '/overview',
    method: 'get',
    params
  })
}
