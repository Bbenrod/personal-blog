require("dotenv").config();

module.exports = {
  source: process.env.POST_SOURCE || "local",
  github: {
    repo: process.env.GITHUB_REPO,
    token: process.env.GITHUB_TOKEN,
  },
};
