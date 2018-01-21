const path = require('path')
const express = require('express')
//express-session: 会话（session）支持中间件
const session = require('express-session')
//connect-mongo: 将 session 存储于 mongodb，需结合 express-session 使用，我们也可以将 session 存储于 redis
const MongoStore = require('connect-mongo')(session)
//connect-flash: 基于 session 实现的用于通知功能的中间件，需结合 express-session 使用
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const pkg = require('./package')   //package.json

const app = express()


app.set('views',path.join(__dirname,'views')) // 设置存放模板文件的目录
app.set('view engine','ejs')
//set static files' directory
app.use(express.static(path.join(__dirname,'public')))
//session middleware
app.use(session({
  name:config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret:config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave:true,// 强制更新 session
  saveUninitialized:false,// 设置为 false，强制创建一个 session，即使用户未登录
  cookie:{
    maxAge:config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store:new MongoStore({// 将 session 存储到 mongodb
    url:config.mongodb  // mongodb 地址
  })
}))
// flash 中间件，用来显示通知
app.use(flash())
// 设置模板全局常量
app.locals.blog = {
  title:pkg.name,
  description:pkg.description
}
//connect-flash: 基于 session 实现的用于通知功能的中间件，需结合 express-session 使用
// 添加模板必需的三个变量
app.use(function(req,res,next){
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})
// 处理表单及文件上传的中间件
//使用 express-formidable 处理表单的上传，表单普通字段挂载到 req.fields 上
app.use(require('express-formidable')({
  uploadDir:path.join(__dirname,'public/img'), //上传文件目录
  keepExtensions:true //保留后缀
}))
// 路由
routes(app)
// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})
