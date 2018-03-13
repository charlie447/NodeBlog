const marked = require('marked')
const Comment = require('../lib/mongo').Comment

Comment.plugin('contentToHtml',{
    afterFind:function(comments){
        return comments.map(function(comment){
            comment.content = marked(comment.content)
            return comment
        })
    }
})
module.exports = {
    //create a comment 
    create: function create (comment){
        return Comment.create(comment).exec()
    },
    //get a comment by comment's id
    getCommentById:function getCommentById(commentId){
        return Comment.findOne({_id:commentId}).exec()
    },
    delCommentById:function delCommentById(commentId){
        return Comment.deleteOne({_id:commentId}).exec()
    },
    // 通过文章 id 删除该文章下所有留言
    delCommentByPostId:function delCommentByPostId(postId){
        return Comment.deleteMany({postId:postId}).exec()
    },
    getComments:function getComments(postId){
        return Comment
            .find({postId:postId})
            .populate({path:'author',model:'User'})
            .sort({_id:1})
            .addCreatedAt()
            .contentToHtml()
            .exec()
    },
    getCommentCount:function getCommentCount(postId){
        return Comment.count({postId:postId}).exec()
    }
}