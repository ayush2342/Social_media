const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.ObjectId
        },
        // This defines the objectID of the liked object
        likeable:{
            type:mongoose.Schema.ObjectId,
            require:true,
            refPath:'onModel'
        },
        // This field is used for defining the type of liked object since it is dynamic reference
        onModel:{
            type:String,
            require:true,
            enum:['Post','Comment']
        }
    },{
        timestamps: true
    }
)


const Like = mongoose.model('Like',likeSchema);
module.exports = Like;