# Node Blog 
*A blog with Node.js* <br>

Tutorial Reference: [git repo](https://github.com/nswbmw/N-blog)
## Quick start
1.Start MongoDB service in terminal with `mongod` command.
2.`forever start ./index.js` 
Then start the web server.




### Errors records
1.无法登出和创建新文章，路由没问题。原因是验证方法有误，即check.js内的checkLogin少了next(),无法执行回调函数
