const express = require('express');
const mongoose = require('mongoose')
const Post = require('../models/post');
const Auth = require('../middleware/auth');
const User = require('../models/user');

const router = new express.Router();

const LIKE = 0.8; 
const POST_LENGTH = 0.2;


router.get('/feed', Auth.fetchUser,  async (req, res) => {
    
    try {

		let posts = await Post.aggregate([
			{ 
				$match: {  "community_id"  : { "$in" : req.user.communities_id  },}
			},
            {
                $lookup: {
                    "from": User.collection.name,
                    "localField": "author",
                    "foreignField": "_id",
                    "as": "user"
                }
            },
            { "$unwind": "$user" },
            {
                $project: {
                    "title" : "$title",
                    "summary" : "$summary",
                    "body" : "$body",
                    "author" : "$user.name",
                    "community_id" : "$community_id",
                    "likes" : "$likes",
                    "status" : "$status",
                    "order" : {
                        $cond: [{$ne: ['$user.country', req.user.country]}, 2, 1]
                    }
                }
            }
		 ]).sort({order : 1})


        const recommendedPosts = await setScore(posts);

        res.status(201).send({
            error: null,
            status: 0,
            data: {
                'posts' : recommendedPosts,
            }
        })

    } catch (err) {

        console.log(err);
        res.status(400).send({
                error: 1,
                errorMsg : err,
                status: 1,
                data: {}
            }
        )
    }
})



async function setScore(posts) {

    for(let i=0; i <posts.length; i++) 
        posts[i]['score'] = ( (posts[i].title.length + posts[i].summary.length + posts[i].body.length) * POST_LENGTH  + (posts[i].likes * LIKE));

    return (
        posts.sort(function(a, b) {

            if(a.order > b.order) {
                return a.order ? 1 : -1;
            }
    
            return b.score - a.score;
        })  
    );
}

module.exports = router