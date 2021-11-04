const mongoose = require('mongoose')

const communitySechema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 60,
    },
    image: {
        type: String,
        required: true
    },
    member_count : {
        type: Number,
        default: 0,
    },
});

communitySechema.virtual('post', {
    ref: 'post',
    localField: '_id',
    foreignField: 'community_id'
})


const Community = mongoose.model('Community', communitySechema);

module.exports = Community