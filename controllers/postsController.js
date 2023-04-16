
const Post = require('../models/posts');
const Comment = require('../models/comment')


module.exports.create= function(req,res)
{
    Post.create(
        {
            content:req.body.content,
            user:req.user._id
        }
    ).then(function()
    {
       console.log('Post Added succesfully')
       return res.redirect('back');

    }).catch(function(error)
    {
       console.log('Error in Posting',error);
    })
}

module.exports.destroy = function(req,res)
{
    Post.findById(req.params.id).then(function(post)
    {
        
        // .id instead of ._id meaning converting the object id into string
        if(post.user==req.user.id)
        {
            
          post.deleteOne();
            Comment.deleteMany({post:req.params.id}).then(function()
            {
               console.log('Post and its Comments Deleted Successfully')
               return res.redirect('back');
            }).catch(function(error)
            {
               console.log('Error in Deleting the Commments of the Post');
            })
        }
        else
        {
            return res.redirect('back');
        }

    }).catch(function(error)
    {
        console.log('Error in Deleting the Post',error);
    })
}
