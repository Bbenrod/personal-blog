const express = require("express");
const blogRouter = require("./blog");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.use("/", blogRouter);

module.exports = router;
