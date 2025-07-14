require("dotenv").config();
const express = require("express");
const clearMarkdown = require("../utils/clearMarkdown");
const axiosInstance = require("../utils/axiosInstance");

const blogRouter = express.Router();
const BLOG_ROUTE = process.env.BLOG_ROUTE || "/blog";

blogRouter.get("/:postName", async (req, res) => {
  const postName = req.params.postName;

  const response = await axiosInstance.get(`/posts/${postName}`);
  const { metadata, markdownData } = response.data;

  const htmlContentClear = clearMarkdown(markdownData);

  res.render("post", {
    content: htmlContentClear,
    title: metadata.title || postName,
    extraContent: "",
    blogRoute: BLOG_ROUTE,
    ...metadata,
  });
});

module.exports = blogRouter;
