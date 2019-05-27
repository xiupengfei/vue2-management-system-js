var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

/* 移动工号 */
router.get('/', (req, res, next) => {
  //  console.log(req.params)
  //  console.log(req.body)
  //  console.log(req.query)
  const num = 40
  var data = []
  for (let i = 0; i < num; i++) {
    const user_list = []
    for (let j = 0; j < Math.ceil(Math.random() * 20 + 5); j++) {
      user_list.push(Mock.mock({
        'id': '@guid',
        'name': '@cname',
        'number': '@integer(10000, 99999)'
      }))
    }

    data.push(Mock.mock({
      'id': '@integer(10000, 99999)',
      'sim': /^1[385][1-9]\d{8}/,
      'users': user_list,
      'state': '启用',
      'description': '@cparagraph(2)'
    }))
  }
  //  res.sendStatus(404)

  res.send({
    total: 188,
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
