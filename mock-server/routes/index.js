var express = require('express')
var router = express.Router()

var permissionMap = {
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
  if (permissionMap.hasOwnProperty(req.body.username)) {
    roles = permissionMap[req.body.username]
  }
  res.send({
    user_id: Math.random(),
    username: req.body.username,
    // roles: roles,
    permissions: roles,
    mail: '123456@qq.com',
    token: `${req.body.username}-token`,
    avatar: 'http://127.0.0.1:3000/images/admin.png'
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
  if (permissionMap.hasOwnProperty(username)) {
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
    avatar: `http://127.0.0.1:3000/images/${avatar}.png`
  })
})

module.exports = router
