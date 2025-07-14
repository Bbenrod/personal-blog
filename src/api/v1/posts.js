require("dotenv").config();
const express = require("express");
const { readPost, readPosts, writePost } = require("../../posts");

const postRouter = express.Router();
const postRoute = "/posts";
const BLOG_ROUTE = process.env.BLOG_ROUTE || "/blog";

postRouter.get("/", async (req, res) => {
  const posts = await readPosts();
  res.status(200).json(posts);
});

postRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { markdown, metadata } = req.body;

    const slug = await writePost({ markdown, metadata });

    return res.status(201).json({
      message: "Post created successfully",
      redirectUrl: `${BLOG_ROUTE}/${slug}`,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "Missing slug in metadata") {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Error saving files" });
  }
});

postRouter.get("/:postName", async (req, res) => {
  const postName = req.params.postName;

  try {
    const postData = await readPost(postName);
    res.status(200).json(postData);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

postRouter.put("/:postName", async (req, res) => {
  res.json({ message: "Post route is working ✅" });
});

postRouter.delete("/:postName", async (req, res) => {
  res.json({ message: "Post route is working ✅" });
});

module.exports = { postRouter, postRoute };
