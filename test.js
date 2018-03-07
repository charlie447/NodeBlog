const express = require('express')
const router = express.Router()
const PostModel = require('./models/posts')

const author = {};
PostModel.getPosts(author);
console.log(PostModel.getPosts(author))


