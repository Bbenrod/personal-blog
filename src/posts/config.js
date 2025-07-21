require("dotenv").config();

module.exports = {
  blog_route: process.env.BLOG_ROUTE || "/blog",
  source: process.env.POST_SOURCE || "local",
  github: {
    repo: process.env.GITHUB_REPO,
    token: process.env.GITHUB_TOKEN,
  },
};
