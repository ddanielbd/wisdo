const mongoose = require('mongoose');
const validator = require('validator');


const userSechema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value))
            {
                throw new Error(`This email address isn't available. Please try another.`)
            }
        }
    },
    image: {
        type: String
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    communities_id: []
})


userSechema.virtual('post', {
    ref: 'post',
    localField: '_id',
    foreignField: 'user_id'
})


userSechema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.__v;
    return userObject;
}





const User = mongoose.model('User', userSechema)

module.exports = User