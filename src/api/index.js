import request from '@/utils/request'

export const login = data => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export const logout = () => {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export const getUserInfo = () => {
  return request({
    url: '/userinfo',
    method: 'get'
  })
}

export const changePassword = data => {
  return request({
    url: '/changepassword',
    method: 'put',
    data
  })
}

export const uploadFile = (url, data, params) => {
  return request({
    url,
    method: 'post',
    data,
    ...params
  })
}

export const downloadFile = (url, params) => {
  return request({
    url,
    method: 'get',
    params,
    responseType: 'blob'
  })
}
