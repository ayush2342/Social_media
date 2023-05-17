const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        content:
        {
            type: String,
            required: true
        },
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
            // Used from the following line in user.js model
            // const User= mongoose.model('User',userSchema);
            // module.exports=User;
        },
        // Include the array of ids of all comments in the post schema itself
        comments:
            [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Comment'
                }
            ],
            likes:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Like'
                }
            ]

    }, {
    timestamps: true
}
)

const Post = mongoose.model('Post', postSchema);

module.exports = Post;


