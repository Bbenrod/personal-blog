require("dotenv").config();
const express = require("express");
const { postRoute, postRouter } = require("./v1/posts");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ message: "API root is working ✅" });
});

router.use("/v1" + postRoute, postRouter);

module.exports = router;
