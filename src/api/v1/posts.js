const express = require("express");
const { getSource } = require("../../posts/source");

const postRouter = express.Router();
const postRoute = "/posts";
const BLOG_ROUTE = process.env.BLOG_ROUTE || "/blog";

postRouter.get("/", async (req, res) => {
  try {
    const { readPosts } = getSource();
    const posts = await readPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

postRouter.post("/", async (req, res) => {
  try {
    const { writePost } = getSource();
    const { markdown, metadata } = req.body;
    const slug = await writePost({ markdown, metadata });

    res.status(201).json({
      message: "Post created successfully",
      redirectUrl: `${BLOG_ROUTE}/${slug}`,
    });
  } catch (error) {
    console.error(error);
    if (error.message === "Missing slug in metadata") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Error saving files" });
  }
});

postRouter.get("/:postName", async (req, res) => {
  try {
    const { readPost } = getSource();
    const postData = await readPost(req.params.postName);
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
