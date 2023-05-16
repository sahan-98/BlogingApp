const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
    
    title: {type: String, required: [true, 'Title is requied']},
    content: {type: String,required: [true, 'Content is requied']},
    postImg: {type: String,required: [true, 'Image is requied']},
    postedBy: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)