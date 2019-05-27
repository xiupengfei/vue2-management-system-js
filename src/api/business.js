import request from '@/utils/request'

export const getBusinesses = (params) => {
  return request({
    url: '/business',
    method: 'get',
    params
  })
}

export const getBusinessDetail = (id, params) => {
  return request({
    url: `/business/${id}`,
    method: 'get',
    params
  })
}

export const createBusinesses = (data) => {
  return request({
    url: '/business',
    method: 'post',
    data
  })
}

export const editBusiness = (id, data) => {
  return request({
    url: `/business/${id}`,
    method: 'put',
    data
  })
}

export const deleteBusinesses = (params) => {
  return request({
    url: '/business',
    method: 'delete',
    params
  })
}
