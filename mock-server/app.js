var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var debug = require('debug')('my-application') // debug模块
const fs = require('fs')
var indexRouter = require('./routes/index')
var userRouter = require('./routes/users')

var app = express()
app.set('port', process.env.PORT || 3000) // 设定监听端口
var server = app.listen(app.get('port'), () => {
  debug('Express server listening on port ' + server.address().port)
})
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With, X-Auth-Token')
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

const baseModuleDir = './routes'

fs.readdirSync(baseModuleDir).map(item => {
  app.use(`/${item.replace('.js', '')}`, require(path.resolve(baseModuleDir, item)))
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
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
