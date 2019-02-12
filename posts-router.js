const express = require('express');

const db = require('./data/db.js');

const router = express.Router();

// posts-router configured to respond to '/api/posts' by server.js

router.get('/', async(req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});



module.exports = router;