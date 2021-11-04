This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 16.30 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install
```

## start.env

    start.env locate in config dirctory and there you can set :

    - server port
    - mogno connction path

## faker

    [faker.js](https://www.npmjs.com/package/faker) generate massive amounts of fake data in the browser and node.js

    we use faker to create our app data for testing and develop in easily and fast.

    in index.js we call to 2 this function for build our data app:

    - fake.buildAppData();
    - fake.createBadWords();

    locate in fake/fake.js

## routers

    - feed
    - post

## models

    - community
    - post
    - user
    - watchlistWord

## End Points

Upload new Post :

```bash
POST  localhost:3000/post
```

Get recommended posts to user:

```bash
GET localhost:3000/feed
```

## Docker

    -   mognodb
