import request from '@/utils/request'

export const getRoles = () => {
  return request({
    url: '/role',
    method: 'get'
  })
}

export const addRole = data => {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export const updateRole = (id, data) => {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export const deleteRole = id => {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
