const express = require('express');
const cors = require('cors');

const postsRouter = require('./posts-router.js');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/posts', postsRouter);  // posts route handlers

server.get('/', (req, res) => {
  res.send(`<h1>Hello from Server!</h1>`);
});

module.exports = server;