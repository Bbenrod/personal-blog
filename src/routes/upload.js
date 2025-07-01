require("dotenv").config();
const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const { marked } = require("marked");
const clearMarkdown = require("../utils/clearMarkdown");
const uploadRouter = express.Router();

const BLOG_ROUTE = process.env.BLOG_ROUTE || "/blog";

uploadRouter.get("/", (req, res) => {
  const formData = req.session.formData || {};
  res.render("upload", { slug: BLOG_ROUTE, formData });
});

uploadRouter.post("/", async (req, res) => {
  try {
    const { markdown, metadata } = getFormData(req.body);
    const postsDir = path.join(__dirname, "..", "..", "posts");

    if (!metadata.slug) {
      return res.status(400).send("Falta el slug en metadata");
    }

    await fs.mkdir(postsDir, { recursive: true });

    const jsonPath = path.join(postsDir, `${metadata.slug}.json`);
    const mdPath = path.join(postsDir, `${metadata.slug}.md`);

    await fs.writeFile(jsonPath, JSON.stringify(metadata, null, 2), "utf-8");

    await fs.writeFile(mdPath, markdown, "utf-8");

    res.status(303).redirect(`${BLOG_ROUTE}/${metadata.slug}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error guardando archivos");
  }
});

uploadRouter.post("/preview", (req, res) => {
  const { markdown, metadata } = getFormData(req.body);

  req.session.formData = {
    markdown,
    ...metadata,
  };

  const htmlContentDirty = marked(markdown);
  const htmlContentClear = clearMarkdown(htmlContentDirty);

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
    slug: data.slug,
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
