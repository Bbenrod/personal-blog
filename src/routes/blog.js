require("dotenv").config();
const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const { marked } = require("marked");
const clearMarkdown = require("../utils/clearMarkdown");

const blogRouter = express.Router();
const BLOG_ROUTE = process.env.BLOG_ROUTE || "/blog";

blogRouter.get("/:postName", async (req, res) => {
  const postName = req.params.postName;
  const postsDir = path.join(__dirname, "..", "..", "posts");

  const mdPath = path.join(postsDir, `${postName}.md`);
  const jsonPath = path.join(postsDir, `${postName}.json`);

  try {
    const [mdData, jsonData] = await Promise.all([
      fs.readFile(mdPath, "utf-8"),
      fs.readFile(jsonPath, "utf-8"),
    ]);

    const metadata = JSON.parse(jsonData);
    const htmlContentDirty = marked(mdData);
    const htmlContentClear = clearMarkdown(htmlContentDirty);

    res.render("post", {
      content: htmlContentClear,
      title: metadata.title || postName,
      extraContent: "",
      blogRoute: BLOG_ROUTE,
      ...metadata,
    });
  } catch (err) {
    if (err.code === "ENOENT") {
      return res.status(404).send("Post o metadata no encontrada");
    }
    console.error("Error al procesar post:", err);
    return res.status(500).send("Error interno del servidor");
  }
});

module.exports = blogRouter;
