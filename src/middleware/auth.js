const User = require('../models/user');



const fetchUser = async (req , res, next) => {

    try {
        const id = req.header('Authorization').replace('Bearer','').trim();
        const user = await User.findById(id);
        
        if(!user) {
            throw new Error()
        }
        
        req.user = user

        next();

    } catch (e) {
        res.status(401).send({error : 'Please authenticate. '})
    }
}


const allowPost = async (req , res, next) => {

    try {

        for (let i = 0; i < req.user.communities_id.length; i++) {

            if (req.user.communities_id[i].toString() === req.body.community_id) {
                next();
                return; 
            }
        }

        throw new Error();

    } catch (e) {
        res.status(401).send({error : `you're not allowed to post in this community`})
    }
}


module.exports = {
    'fetchUser' : fetchUser,
    'allowPost' : allowPost
} 