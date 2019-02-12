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

router.get('/:id', async(req, res) => {
  try {
    // console.log(" get id: ", req.params.id);
    const post = await db.findById(req.params.id);
    // console.log("posts: ", post);
    if (post.length < 1) {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else {
      res.status(200).json(post);
    }
  } catch {
    res.status(500).json({ error: "The post information could not be retrieved." });
  }
});

module.exports = router;