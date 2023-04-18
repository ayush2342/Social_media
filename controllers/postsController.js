
const Post = require('../models/posts');
const Comment = require('../models/comment')


module.exports.create= async function(req,res)
{
    try {
        await Post.create(
                {
                    content:req.body.content,
                    user:req.user._id
                }
             ) 
    req.flash('success','Post Added succesfully');
    return res.redirect('back');
        
    } catch (error) {
        req.flash('error',error);
        console.log('Error',error);
        return res.redirect('back');
    }

    // Reference Code Used Earlier without try catch and async await

    // Post.create(
    //     {
    //         content:req.body.content,
    //         user:req.user._id
    //     }
    // ).then(function()
    // {
    //    console.log('Post Added succesfully')
    //    return res.redirect('back');

    // }).catch(function(error)
    // {
    //    console.log('Error in Posting',error);
    // })
}

module.exports.destroy = async function(req,res)
{

    try {
        let post = await Post.findById(req.params.id);
        // .id instead of ._id meaning converting the object id into string
        if(post.user==req.user.id)
        {
            
          post.deleteOne();
            await Comment.deleteMany({post:req.params.id});
            req.flash('success','Post and its Comments Deleted Successfully');
            return res.redirect('back');
        }
        else
        {
            req.flash('error','Unable to delete the Post');
            return res.redirect('back');
        }
        
    } catch (error) {

        req.flash('error',error);
        console.log('Error',error);
        return res.redirect('back');
    }
     // Reference Code Used Earlier without try catch and async await

    // Post.findById(req.params.id).then(function(post)
    // {
        
    //     // .id instead of ._id meaning converting the object id into string
    //     if(post.user==req.user.id)
    //     {
            
    //       post.deleteOne();
    //         Comment.deleteMany({post:req.params.id}).then(function()
    //         {
    //            console.log('Post and its Comments Deleted Successfully')
    //            return res.redirect('back');
    //         }).catch(function(error)
    //         {
    //            console.log('Error in Deleting the Commments of the Post');
    //         })
    //     }
    //     else
    //     {
    //         return res.redirect('back');
    //     }

    // }).catch(function(error)
    // {
    //     console.log('Error in Deleting the Post',error);
    // })
}
