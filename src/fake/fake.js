const faker = require('faker');
const User = require('../models/user');
const WatchlistWord = require('../models/watchlistWord');
const Community = require('../models/community');
const Post = require('../models/post');


const buildAppData = async () => {

    let posts = []; 

    const communities = [
        "funny funny funny funny funny funny funny funny funny funny funny funny funny funny",
        "coding coding coding coding coding coding coding coding coding coding coding coding",
        "gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming",
        "sport sport sport sport sport sport sport sport sport sport sport sport sport sport"
    ]; 
    
    for(let i = 0; i < communities.length; i++) {
        communities[i] = {
            'title' : communities[i],
            'image' : faker.image.imageUrl(),
            'member_count' : Math.floor(Math.random() * 999) +1
        }
    }

    try {
        await Community.deleteMany({}); 
        const communitiesResult = await Community.insertMany(communities);
        createUsers(10,communitiesResult);

    } catch (err) {
        console.log(`Error : insert communities is faild - ${err}`);
    }
}



const createUsers = async (numberOfUsers,communities) => {

    let users = []; 
    const roles = ["moderator","super moderator",''];
    const communities_id = [
        [communities[0]._id,communities[1]._id],
        [communities[0]._id,communities[1]._id,communities[3]._id],
        [communities[2]._id],
        [communities[2]._id,communities[3]._id]
    ];

    for(let i = 0; i < numberOfUsers; i++) {
        users.push({
            'name' : faker.name.firstName(),
            'role' : roles[Math.floor(Math.random() * roles.length)],
            'email': faker.internet.email(),
            'image': faker.image.imageUrl(),
            'country': faker.address.country(),
            'communities_id': communities_id[Math.floor(Math.random() * communities_id.length)]
        })
    }

    try {
        await User.deleteMany({}); 
        await User.insertMany(users);
        createPosts(15);
     } catch (err) {
         console.log(`Error : insert users faild - ${err}`);
     }
}


const createPosts = async (numberOfPost) => {

    const text = [
        "funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny funny",
        "coding coding coding coding coding coding coding coding coding coding coding coding coding coding coding coding coding coding coding coding coding coding coding coding",
        "gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming gaming",
        "sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport sport"
    ]; 

    const status = ['Pending approval', 'Approved'];

    try {

        const usersResult = await User.find({}, {_id:1, communities_id:1});
        let post = [] , index = 0;
        for(let i = 0; i < numberOfPost; i++) {

            index  = [Math.floor(Math.random() * usersResult.length)];

            post.push({
                'title' : text[Math.floor(Math.random() * text.length)],
                'summary' : text[Math.floor(Math.random() * text.length)],
                'body': text[Math.floor(Math.random() * text.length)],
                'author': usersResult[index]._id,
                'community_id': usersResult[index].communities_id[[Math.floor(Math.random() * usersResult[index].communities_id.length)]],
                'likes' : Math.floor(Math.random() * 10000),
                'status' : status[Math.floor(Math.random() * status.length)]
            })
        }

        await Post.deleteMany({}); 
        await Post.insertMany(post);

    } catch (err) {
        console.log(`Error : create posts is faild - ${err}`);
    }
}


const createBadWords = async () => {

    const badWords = ["Arse", "Bloody", "Bugger", "Cow", "Crap", "Damn", "Ginger", "Git", "God", "Goddam", "Jesus Christ", "Minger", "Sod-off", "Arsehole", "Balls", "Bint", "Bitch", "Bollocks", "Bullshit", "Feck", "Munter", "Pissed/pissed off", "Shit", "Son of a bitch", "Tits", "Bastard", "Beaver", "Beef curtains", "Bellend", "Bloodclaat", "Clunge", "Cock", "Dick", "Dickhead", "Fanny", "Flaps", "Gash", "Knob", "Minge", "Prick", "Punani", "Pussy", "Snatch", "Twat", "Cunt", "Fuck", "Motherfucker"]; 
    let words = [];
    for(let i = 0; i < badWords.length; i++)
        words.push({'word' : badWords[i]}); 

    try {
        await WatchlistWord.deleteMany({}); 
        await WatchlistWord.insertMany(words);
    } catch (err) {
        console.log(`Error : insert bad words is faild - ${err}`);
    }
}



module.exports = {
    'buildAppData' : buildAppData,
    'createUsers' : createUsers,
    'createBadWords' : createBadWords,
    'createPosts' : createPosts,
}