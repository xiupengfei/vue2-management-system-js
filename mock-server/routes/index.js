var express = require('express')
var router = express.Router()
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
  const roles = [['admin'].includes(req.body.username) ? 'admin' : 'member']

  res.send({
    user_id: Math.random(),
    username: req.body.username,
    roles: roles,
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

  const roles = [token.includes('admin') ? 'admin' : 'member']
  const username = token.replace('-token', '')
  const avatar = username === 'admin' ? username : 'user'
  res.send({
    id: Math.random(),
    name: username,
    mail: '123456@qq.com',
    roles: roles,
    token: `${username}-token`,
    avatar: `http://127.0.0.1:3000/images/${avatar}.png`
  })
})

module.exports = router
