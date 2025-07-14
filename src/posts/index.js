const config = require("./config");
const sourceLocal = require("./sourceLocal");

const POST_SOURCE = config.source;

let source;

switch (POST_SOURCE) {
  case "local":
    source = sourceLocal;
    break;
  default:
    throw new Error(`Unknown POST_SOURCE: ${POST_SOURCE}`);
}

module.exports = {
  readPosts: source.readPosts,
  writePost: source.writePost,
  readPost: source.readPost,
  updatePost: source.updatePost,
  deletePost: source.deletePost,
  postExists: source.postExists,
};
