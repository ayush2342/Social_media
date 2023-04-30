const Post = require('../../../models/posts')
const Comment = require('../../../models/comment')


module.exports.index = async function (req, res) {
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user', '-password -email')
        .populate(
            {
                path: 'comments',
                populate:
                {
                    path: 'user'
                }
            }
        )

    return res.status(200).json(
        {
            message: 'List of Posts',
            posts: posts
        })
}


module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);
        // .id instead of ._id meaning converting the object id into string


        if(post.user == req.user.id)
        {
            post.deleteOne();
        await Comment.deleteMany({ post: req.params.id });

        return res.status(200).json(
            {
                message: "Post and its Comments Deleted Successfully"
            }
        );
        }
        else{
            return res.status(401).json({
                message:"You cannot delete this post"
            })
        }
        


    } catch (error) {

        console.log('Error', error);

        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        );
    }
}