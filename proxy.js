/*
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-10-08 19:16:30
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 19:16:33
 */

module.exports = {
  [process.env.VUE_APP_BASE_API]: {
    target: 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: {
      ['^' + process.env.VUE_APP_BASE_API]: '',
    },
  },
}
