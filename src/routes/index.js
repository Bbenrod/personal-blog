require("dotenv").config();
const express = require("express");

const BLOG_ROUTE = process.env.BLOG_ROUTE || "/blog";

const blogRouter = require("./blog");
const uploadRouter = require("./upload");
const axiosInstance = require("../utils/axiosInstance");

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await axiosInstance.get("/posts");
  const posts = response.data;
  res.render("index", { posts, blogRoute: BLOG_ROUTE });
});

router.use("/upload", uploadRouter);
router.use("/", blogRouter);

module.exports = router;
