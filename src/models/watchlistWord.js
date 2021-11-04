const mongoose = require('mongoose')

const watchlistWordSechema = new mongoose.Schema({
    word: {
        type: String,
    }
});

const WatchlistWord = mongoose.model('WatchlistWord', watchlistWordSechema);

module.exports = WatchlistWord