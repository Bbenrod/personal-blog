require("dotenv").config();
const express = require("express");
const clearMarkdown = require("../utils/clearMarkdown");
const axiosInstance = require("../utils/axiosInstance");

const uploadRouter = express.Router();

const BLOG_ROUTE = process.env.BLOG_ROUTE || "/blog";

uploadRouter.get("/", (req, res) => {
  const formData = req.session.formData || {};
  res.render("upload", { blogRoute: BLOG_ROUTE, formData });
});

uploadRouter.post("/", async (req, res) => {
  try {
    const { markdown, metadata } = getFormData(req.body);
    const response = await axiosInstance.post("/posts", { markdown, metadata });
    const redirectUrl = response.data.redirectUrl;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Error creating post");
  }
});

uploadRouter.post("/preview", (req, res) => {
  const { markdown, metadata } = getFormData(req.body);

  req.session.formData = {
    markdown,
    ...metadata,
  };

  const htmlContentClear = clearMarkdown(markdown);

  const extraContent = `
    <div class="buttons">
      <div class="buttons">
        <a href="${BLOG_ROUTE}/upload" class="preview-btn" role="button">
          Volver
        </a>
      </div>
    </div>
  `;

  res.render("post", {
    content: htmlContentClear,
    title: metadata.title,
    blogRoute: BLOG_ROUTE,
    extraContent,
    ...metadata,
  });
});

const getFormData = (data) => {
  const tags = data.tags;
  const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];
  const markdown = data.markdown;

  const metadata = {
    title: data.title,
    slug: data.slug.replace(/ +/g, "-"),
    date: new Date(),
    author: data.author,
    tags: tagsArray,
    description: data.description,
    thumbnail: data.thumbnail,
    published: true,
  };

  return {
    markdown,
    metadata,
  };
};

module.exports = uploadRouter;
