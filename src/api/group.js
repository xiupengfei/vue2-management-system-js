import request from '@/utils/request'

export const getGroups = (params) => {
  return request({
    url: '/group',
    method: 'get'
  })
}

