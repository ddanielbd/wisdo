const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const Auth = require('../middleware/auth');
const WatchlistWord = require('../models/watchlistWord');

const router = new express.Router();


router.post('/post', Auth.fetchUser, Auth.allowPost, async (req, res) => {

    const post = new Post(req.body);
    
    try {

        watchList(post.title,post.summary,post.body);

        if(!post.summary)
            post.summary = post.body.split(/\s+/).slice(0,150).join(" ");

        await post.save();

        res.status(201).send({
                error: null,
                status: 0,
                data: {
                    user: req.user,
                    post : post
                }
            })

    } catch (err) {

        res.status(400).send({
                error: 1,
                errorMsg : err,
                status: 1,
                data: {}
            }
        )
    }
})

const watchList = async (title,summary,body) => {

    let detectBadWords = title+' '+summary+' '+body;
    detectBadWords = Array.from(new Set(detectBadWords.split(' ')));
    
    try {
        const badwords = await WatchlistWord.find({})
        for(let i=0; i<detectBadWords.length; i++) {
            
            if(badwords.find( ({ word }) => word.toLowerCase() === detectBadWords[i].toLowerCase())) {
                const users = await User.find({$or : [ {'role':'moderator'}, {'role':'super moderator'}]})

                users.forEach(function (user) {
                    sendEmail(user.email, 'wisdo summary', 'wisdo body');
                });
            }
        }

    } catch (e) {
        res.status(401).send({error : `WatchlistWord error`})
    }
}

function sendEmail(to, subject, body) {
    console.log("sendEmail called", {to, subject, body})
}


module.exports = router