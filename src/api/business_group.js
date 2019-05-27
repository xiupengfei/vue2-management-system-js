import request from '@/utils/request'

export const getBusinessGroups = (params) => {
  return request({
    url: '/business_group',
    method: 'get',
    params
  })
}

export const createBusinessGroups = (data) => {
  return request({
    url: '/business_group',
    method: 'post',
    data
  })
}

export const editBusinessGroup = (id, data) => {
  return request({
    url: `/business_group/${id}`,
    method: 'put',
    data
  })
}

export const deleteBusinessGroups = (params) => {
  return request({
    url: '/business_group',
    method: 'delete',
    params
  })
}
