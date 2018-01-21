module.exports = {
  checkLogin:function checkLogin(req,res,next){
    if(!req.session.user){
      req.flash('error',"未登录")  //通过 req.flash(name, value) 设置这个对象下的字段和值
      return res.redirect('/signin')
    }
    next()
  },
  checkNotLogin:function checkNotLogin(req,res,next){
    if(req.session.user){
      req.flash('error',"已登录")
      return res.redirect('back')
    }
    next()
  }
}
