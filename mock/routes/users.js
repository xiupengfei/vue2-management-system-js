/*
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-10-08 19:32:16
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 19:40:17
 */
const express = require('express')
const router = express.Router()
const Mock = require('mockjs')

/* 用户信息 */
router.get('/', (req, res, next) => {
  //  console.log(req.params)
  //  console.log(req.body)
  //  console.log(req.query)
  const num = 40
  // 员工工号 姓名 性别 出生年月 入职时间 邮箱 电话 员工级别 基本薪资(元) 用户组权限
  const roles = ['admin', 'system', 'hr', 'manager', 'leader', 'default']
  const data = []
  for (let i = 0; i < num; i++) {
    data.push(
      Mock.mock({
        id: '@guid',
        name: '@cname',
        gender: '@boolean(1, 9, true)',
        birth: '@date',
        entry_time: '@date',
        mail: '@email',
        phone: /^1[385][1-9]\d{8}/,
        level: '@string("number", 1)',
        salary: '@string("number", 4, 6)',
        roles: [
          {
            name: roles[Mock.mock({ 'number|0-5': 0 }).number],
            action: [],
          },
        ],
      }),
    )
  }
  //  res.sendStatus(404)

  res.send({
    total: 155,
    data: data,
  })
})

module.exports = router
