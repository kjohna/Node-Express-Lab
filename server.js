const express = require('express');
const cors = require('cors');
const path = require('path');

const postsRouter = require('./posts-router.js');

const server = express();

// guide for heroku deploy: https://medium.freecodecamp.org/how-to-deploy-a-react-app-with-an-express-server-on-heroku-32244fe5a250

server.use(express.static(path.join(__dirname, 'client/build')));

// production mode:
if(process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client/build')));
  //
  server.get('/', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}

// build mode:
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

server.use(express.json());
server.use(cors());

server.use('/api/posts', postsRouter);  // posts route handlers

// // for initial testing: 
// server.get('/', (req, res) => {
//   res.send(`<h1>Hello from Server!</h1>`);
// });

module.exports = server;