module.exports = {
  port: 3000,
  session: {
    secret: 'NodeBlog',
    key: 'NodeBlog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/NodeBlog'
}
