var express = require('express');
var router = express.Router();
var Mock = require('mockjs')

/* 组信息 */
router.get('/', function(req, res, next) {
//  console.log(req.params)
//  console.log(req.body)
//  console.log(req.query)
const num = 40;
    roles = ['admin', 'system', 'hr', 'manager', 'leader', 'default']
    var data = []
    for(let i=0; i< num; i++){
        data.push(Mock.mock({
            'id': '@guid',
            'desc': '@cparagraph(2)',
            'roles': [{
                name: roles[Mock.mock({"number|0-5": 1}).number],
                action: []
            }]
        }))
    }
    res.send({
        total: 150,
        data: data
    });
});

module.exports = router;