
const Post = require('../models/posts')


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