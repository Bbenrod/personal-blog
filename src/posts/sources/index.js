const path = require("path");
const config = require("../config");
const createLocalSource = require("./sourceLocal");
const createGithubSource = require("./sourceGitHub");

const POST_SOURCE = config.source;
const baseDir = path.join(__dirname, "..", "..", "..");

async function createSource() {
  let source;

  switch (POST_SOURCE) {
    case "local":
      source = createLocalSource(baseDir);
      break;
    case "github":
      const repoUrl = `https://${config.github.token}@${config.github.repo}.git`;
      source = await createGithubSource(baseDir, repoUrl);
      break;
    default:
      throw new Error(`Unknown POST_SOURCE: ${POST_SOURCE}`);
  }

  return {
    readPosts: source.readPosts,
    writePost: source.writePost,
    readPost: source.readPost,
    updatePost: source.updatePost,
    deletePost: source.deletePost,
    postExists: source.postExists,
  };
}

module.exports = createSource;
