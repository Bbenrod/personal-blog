const express = require("express");
const blogRouter = require("./blog");
const loadPosts = require("../utils/loadPosts");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await loadPosts();
  res.render("index", { posts });
});

router.use("/", blogRouter);

module.exports = router;
