var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

/* 业务管理 */
// 查看业务列表
router.get('/', (req, res, next) => {
  //  console.log(req.params)
  //  console.log(req.body)
  //  console.log(req.query)
  const num = 40
  var data = []
  for (let i = 0; i < num; i++) {
    const group_list = []
    const fields_list = []
    for (let j = 0; j < Math.ceil(Math.random() * 5 + 1); j++) {
      group_list.push(Mock.mock({
        'id': '@guid',
        'name': '@ctitle'
      }))
      fields_list.push(Mock.mock({
        'id': '@guid',
        'name': '@ctitle(2, 5)'
      }))
    }
    data.push(Mock.mock({
      'id': '@guid',
      'name': '@ctitle',
      'founders': '@cname',
      'create_time': '@datetime',
      'state': '运行中',
      'groups': group_list,
      'fields': fields_list,
      'desc': '@cparagraph(2)'
    }))
  }
  //  res.sendStatus(404)

  res.send({
    total: 188,
    data: data
  })
})

// 查看业务详细
router.get('/:id', (req, res, next) => {
  // console.log(req.params)
  // console.log(req.body)
  // console.log(req.query)
  const group_list = []
  const fields_list = []
  for (let j = 0; j < Math.ceil(Math.random() * 5 + 1); j++) {
    group_list.push(Mock.mock({
      'id': '@guid',
      'name': '@ctitle'
    }))
    fields_list.push(Mock.mock({
      'id': '@guid',
      'name': '@ctitle(2, 5)'
    }))
  }
  const data = Mock.mock({
    'id': '@guid',
    'name': '@ctitle',
    'founders': '@cname',
    'create_time': '@datetime',
    'state': '运行中',
    'groups': group_list,
    'fields': fields_list,
    'desc': '@cparagraph(2)'
  })
  //  res.sendStatus(404)

  res.send({
    msg: 'success',
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
