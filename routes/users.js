
const express = require('express')
const router = express.Router()


router.get('/:name',function(req,res){
  //res.send('hello,'+req.params.name)
  res.render('users',{  //res.render 的作用就是将模板和数据结合生成 html
    name:req.params.name
  })
})

module.exports = router
