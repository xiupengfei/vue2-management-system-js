/*
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-10-08 19:31:20
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 19:45:55
 */
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const debug = require('debug')('my-application') // debug模块
const fs = require('fs')
const indexRouter = require('./routes/index')

const app = express()
app.set('port', 3000)

const server = app.listen(app.get('port'), () => {
  debug('Express server listening on port ' + server.address().port)
})
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept, X-Requested-With, X-Auth-Token',
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  //  res.setHeader('content-type', 'application/jsoncharset=utf-8')
  //  res.setHeader('content-type', 'text/html charset=utf-8')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    setTimeout(() => {
      next()
    }, 500)
  }
})
// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'html')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

const baseModuleDir = path.join(__dirname, 'routes')

fs.readdirSync(baseModuleDir).map((item) => {
  app.use(`/${item.replace('.js', '')}`, require(path.resolve(baseModuleDir, item)))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// module.exports = app
