const express = require('express');
const app = express();
require('../db/mongoose');
const fake = require('./fake/fake');

const postRouter = require('./routers/post');
const feedRouter = require('./routers/feed');

app.use(express.json());
app.use(postRouter);
app.use(feedRouter);

fake.buildAppData();
fake.createBadWords();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port ' + port)
});
