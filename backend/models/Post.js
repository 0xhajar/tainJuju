const { v4: uuidv4 } = require('uuid');
const path = require('node:path');

const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/posts.json');

function createOnePost(message) {
  const posts = parse(jsonDbPath, []);
  const createdPost = {
    id: uuidv4(),
    message,
  };
  posts.push(createdPost);
  serialize(jsonDbPath, posts);

  return createdPost.id;
}

function getPosts() {
  const posts = parse(jsonDbPath, []);
  return posts;
}

function updateOnePost(id, message) {
  const posts = parse(jsonDbPath, []);
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) return undefined;

  const updatedPost = {
    id,
    message,
  };
  posts[postIndex] = updatedPost;
  serialize(jsonDbPath, posts);

  return updatedPost;
}

function deleteOnePost(id) {
  const posts = parse(jsonDbPath, []);
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) return undefined;

  const deletedPost = posts.splice(postIndex, 1);
  serialize(jsonDbPath, posts);

  return deletedPost;
}

module.exports = {
  createOnePost,
  updateOnePost,
  deleteOnePost,
  getPosts,
};
