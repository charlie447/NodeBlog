
const PostModel = require('./models/posts')
const Post = require('./lib/mongo').Post
const author = {};
const query = {_id:'5aa2434173b47f14a99a948d'}
//PostModel.getPosts(author);
Post.find()
    
    .populate({ path: 'author', model: 'User' })
    .sort({ _id: -1 })
    //.addCreatedAt()
    .contentToHtml()
    .exec()
    .then(console.log)
    .catch(console.error);


