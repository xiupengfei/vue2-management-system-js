var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

/* 业务查看 */
router.get('/', (req, res, next) => {
  //  console.log(req.params)
  //  console.log(req.body)
  //  console.log(req.query)
  const num = 40
  var data = []
  for (let i = 0; i < num; i++) {
    const total = Math.ceil(Math.random() * 600) + 100
    data.push(Mock.mock({
      'id': '@guid',
      'name': '@ctitle',
      'founders': 'admin',
      'create_time': '@datetime',
      'success': total - Math.ceil(Math.random() * 60),
      'total': total
    }))
  }
  //  res.sendStatus(404)

  res.send({
    total: 155,
    data: data
  })
})

router.post('/', (req, res, next) => {
  res.send({})
})

router.put('/', (req, res, next) => {
  res.send({})
})

router.delete('/', (req, res, next) => {
  res.send({})
})

module.exports = router
