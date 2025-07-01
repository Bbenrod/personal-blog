const express = require("express");

const blogRouter = require("./blog");
const uploadRouter = require("./upload");

const loadPosts = require("../utils/loadPosts");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await loadPosts();
  res.render("index", { posts });
});

router.use("/upload", uploadRouter);
router.use("/", blogRouter);

module.exports = router;
