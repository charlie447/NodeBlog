const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin
// GET /signout 登出
router.get('/',checkLogin,function(req,res,next){
  console.log('logging out!!')
  // 清空 session 中用户信息
  req.session.user = null
  req.flash('success','登出成功')
  //重定向到主页
  res.redirect('/posts')
})
module.exports = router
