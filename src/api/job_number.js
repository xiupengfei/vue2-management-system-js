import request from '@/utils/request'

export const getJobNumbers = (params) => {
  return request({
    url: '/job_number',
    method: 'get',
    params
  })
}

export const createJobNumbers = (data) => {
  return request({
    url: '/job_number',
    method: 'post',
    data
  })
}

export const editJobNumber = (id, data) => {
  return request({
    url: `/job_number/${id}`,
    method: 'put',
    data
  })
}

export const deleteJobNumbers = (params) => {
  return request({
    url: '/job_number',
    method: 'delete',
    params
  })
}
