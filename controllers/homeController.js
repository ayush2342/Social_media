const Post = require('../models/posts');
const User = require('../models/user');

module.exports.home = async function (req, res) {

    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate(
                {
                    path: 'comments',
                    populate:[
                        {
                            path: 'user'
                        },
                        {
                            path: 'likes'
                        }
                    ]
                    
                    
                }
            ).populate('likes')
            
        let user = await User.find({});

        return res.render('./home', {
            title: 'SocialCode | Home',
            posts: posts,
            all_users: user
        });
    } catch (error) {
        console.log('Error', error);
    }

    // Reference Code Used Earlier without try catch and async await

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

    // Post.find({})
    // .populate('user')
    // .populate(
    //     {
    //         path:'comments',
    //         populate:
    //         {
    //             path:'user'
    //         }
    //     }
    // )
    // .exec().then(function(posts)
    // {
    //     User.find({}).then(function(user)
    //     {
    //         res.render('./home',{
    //             title:'SocialCode | Home',
    //             posts:posts,
    //             all_users:user
    //         })
    //     }).catch(function(error)
    //     {
    //         console.log('Error in Finding all Users',error);
    //     })

    // }).catch(function(error)
    // {
    //     console.log('Error in Displaying Posts',error);

    // })


}

