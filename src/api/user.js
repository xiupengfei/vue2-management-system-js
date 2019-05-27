import request from '@/utils/request'

export const getUsers = (params) => {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

export const createUsers = (data) => {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export const editUser = (id, data) => {
  return request({
    url: `/user/${id}`,
    method: 'put',
    data
  })
}

export const deleteUsers = (params) => {
  return request({
    url: '/user',
    method: 'delete',
    params
  })
}
