var express = require('express')
var router = express.Router()
var roleAssignment = require('../vendor/roleAssignment')
// var server = require('http').Server(express())
// var io = require('socket.io')(server)

// server.listen(3001)

// let count = 0
// io.on('connection', (socket) => {
//   count++
//   io.emit('news', { count: count })
//   socket.on('disconnect', () => {
//     count--
//     io.emit('news', { count: count })
//   })

//   socket.on('listen:client', (data) => {

//   })
// })

// 登录
router.post('/login', (req, res, next) => {
  // console.log(req.params)
  // console.log(req.body)
  // console.log(req.query)
  let roles = []
  if (['admin', 'system'].includes(req.body.username)) {
    roles = [{
      name: req.body.username,
      actions: []
    }]
  } else {
    roles = [{
      name: req.body.username,
      actions: roleAssignment[req.body.username]
    }]
  }
  res.send({
    code: 20000,
    user_id: '0001',
    username: req.body.username,
    roles: roles,
    gender: '男',
    birth: 1557532800000,
    mail: '123456@qq.com',
    mobile_phone: '18888888888',
    level: 'V1',
    state: '在职',
    salary: 5000,
    department: '部门1',
    group: '组1',
    number: '0000000',
    entry_time: 1557560811477,
    token: `${req.body.username}-token`,
    avatar: 'http://127.0.0.1:3000/images/admin.gif',
    message: 'success'
  })
})

// 登出
router.post('/logout', (req, res, next) => {
  res.send()
})

module.exports = router
