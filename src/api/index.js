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
