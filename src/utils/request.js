import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const UNKNOWN_ERROR = '未知错误!'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 跨域请求时发送cookie
  timeout: 30000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['x-auth-token'] = getToken()
    }
    return config
  },
  error => {
    // 请求失败时
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => response.data,
  error => {
    // timeout of 5000ms exceeded
    const re = /^timeout of (\d+)ms exceeded$/
    if (re.test(error.message)) {
      error.message = `请求超时: ${RegExp.$1}毫秒, 请重试！`
    }
    let showMessage = true
    switch (error.response && error.response.status) {
      case 400:
        error.message = error.response.data.msg || error.response.data.message || UNKNOWN_ERROR
        break
      case 401:
        error.message = '登录失效, 请重新登录！'
        showMessage = false
        MessageBox.alert('令牌超时需重新登录', '提示:', {
          confirmButtonText: '重新登录',
          showClose: false,
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        break
      case 403:
        error.message = '服务器拒绝了您的请求操作！'
        break
      case 404:
        error.message = '资源不存在, 或已被删除！'
        break
      case 500:
        error.message = '服务器异常！'
        break
      // default:
      //   error.message = UNKNOWN_ERROR
    }
    if (showMessage) {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }

    return Promise.reject(error)
  }
)

export default service
