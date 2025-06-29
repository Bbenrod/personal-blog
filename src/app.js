require("dotenv").config();

const path = require("path");
const express = require("express");
const router = require("./routes");

const app = express();
const rootDir = path.resolve(__dirname, "..");

const PORT = process.env.PORT || 3000;
const BLOG_ROUTE = process.env.BLOG_ROUTE || "/blog";

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "src", "views"));
app.use(express.static(path.join(rootDir, "public")));

app.use(BLOG_ROUTE, router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
