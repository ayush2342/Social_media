const Post = require('../models/posts')

module.exports.home=function(req,res)
{
    // console.log(req.cookies);
    // res.cookie('user_id',77);

    // Post.find({}).then(function(posts)
    // {
    //     res.render('./home',{
    //         title:'SocialCode | Home',
    //         posts:posts
    //     })
    // }).catch(function(error)
    // {
    //     console.log('Error in Displaying Posts',error);
  
    // })

    Post.find({})
    .populate('user')
    .populate(
        {
            path:'comments',
            populate:
            {
                path:'user'
            }
        }
    )
    .exec().then(function(posts)
    {
        res.render('./home',{
            title:'SocialCode | Home',
            posts:posts
        })
    }).catch(function(error)
    {
        console.log('Error in Displaying Posts',error);
  
    })
    
}

