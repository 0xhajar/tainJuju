const express = require('express');

const router = express.Router();
const Post = require('../models/Post');
const { authorize, isAdmin } = require('../utils/auths');

/* GET posts listing. */
router.get('/', (req, res) => {
  res.json(Post.getPosts());
});

router.post('/createPost', authorize, isAdmin, (req, res) => {
  const message = req?.body?.message?.length !== 0 ? req.body.message : undefined;

  if (!message) return res.sendStatus(400); // error code '400 Bad request'

  const createdPost = Post.createOnePost(
    message,
  );

  return res.json(createdPost);
});

router.patch('/updatePost', authorize, isAdmin, (req, res) => {
  const id = req?.body?.id;
  const message = req?.body?.message;

  if ((!id && !message) || id?.length === 0 || message?.length === 0) {
    return res.sendStatus(400);
  }

  const updatedPost = Post.updateOnePost(
    id,
    message,
  );

  if (!updatedPost) return res.sendStatus(404);

  return res.json(updatedPost);
});

router.delete('/deletePost', authorize, isAdmin, (req, res) => {
  const deletedPost = Post.deleteOnePost(req.body.id);

  if (!deletedPost) return res.sendStatus(404);

  return res.json(deletedPost);
});

module.exports = router;
