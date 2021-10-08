/*
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-10-08 19:32:16
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 19:47:29
 */
const express = require('express')
const router = express.Router()

const permissionMap = {
  admin: ['admin'],
  system: ['system:create', 'system:delete', 'system:update', 'system:query'],
  permission: ['permission:create', 'permission:delete', 'permission:update', 'permission:query'],
  hongshen: ['system:create', 'permission:update'],
}

// 登录
router.post('/login', (req, res, next) => {
  // console.log(req.params)
  // console.log(req.body)
  // console.log(req.query)
  // const roles = [['admin'].includes(req.body.username) ? 'admin' : 'member']
  let roles = []

  if (Reflect.has(permissionMap, req.body.username)) {
    roles = permissionMap[req.body.username]
  }
  res.send({
    user_id: Math.random(),
    username: req.body.username,
    // roles: roles,
    permissions: roles,
    mail: '123456@qq.com',
    token: `${req.body.username}-token`,
    avatar: 'http://127.0.0.1:3000/images/admin.png',
  })
})

// 登出
router.post('/logout', (req, res, next) => {
  res.send()
})

// 登出
router.get('/userinfo', (req, res, next) => {
  const token = req.headers['x-auth-token'] || ''

  // const roles = [token.includes('admin') ? 'admin' : 'member']
  const username = token.replace('-token', '')
  let roles = []

  if (Reflect.has(permissionMap, username)) {
    roles = permissionMap[username]
  }

  const avatar = username === 'admin' ? username : 'user'
  res.send({
    id: Math.random(),
    name: username,
    mail: '123456@qq.com',
    // roles: roles,
    permissions: roles,
    token: `${username}-token`,
    avatar: `http://127.0.0.1:3000/images/${avatar}.png`,
  })
})

module.exports = router
