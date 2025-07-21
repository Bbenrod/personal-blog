const express = require("express");
const {
  getAllPosts,
  createPost,
  getPostByName,
  updatePost,
  deletePost,
} = require("../../posts/service");

const postRouter = express.Router();
const postRoute = "/posts";

postRouter.get("/", getAllPosts);
postRouter.post("/", createPost);
postRouter.get("/:postName", getPostByName);
postRouter.put("/:postName", updatePost);
postRouter.delete("/:postName", deletePost);

module.exports = { postRouter, postRoute };
