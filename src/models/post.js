const mongoose = require('mongoose')

const postSechema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 60,
    },
    summary: {
        type: String,
        minlength: 150,
    },
    body: {
        type: String,
        required: true,
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    community_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'community'
    },
    likes : {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Pending approval"
    }
});


const Post = mongoose.model('Post', postSechema);

module.exports = Post