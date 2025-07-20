const fs = require("fs/promises");
const path = require("path");

function createLocalSource(postsDir) {
  function getPostFilePath(slug, ext) {
    return path.join(postsDir, `${slug}.${ext}`);
  }

  async function readPosts() {
    const files = await fs.readdir(postsDir);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    const posts = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(postsDir, file);
        const content = await fs.readFile(filePath, "utf-8");
        return JSON.parse(content);
      })
    );

    return posts.filter(({ published }) => published);
  }

  async function writePost(content) {
    const { markdown, metadata } = content;

    if (!metadata.slug) {
      throw new Error("Missing slug in metadata");
    }

    await fs.mkdir(postsDir, { recursive: true });

    const jsonPath = getPostFilePath(metadata.slug, "json");
    const mdPath = getPostFilePath(metadata.slug, "md");

    await fs.writeFile(jsonPath, JSON.stringify(metadata, null, 2), "utf-8");
    await fs.writeFile(mdPath, markdown, "utf-8");

    return metadata.slug;
  }

  async function readPost(postName) {
    const mdPath = getPostFilePath(postName, "md");
    const jsonPath = getPostFilePath(postName, "json");

    try {
      const [markdownData, metadataRaw] = await Promise.all([
        fs.readFile(mdPath, "utf-8"),
        fs.readFile(jsonPath, "utf-8"),
      ]);

      const metadata = JSON.parse(metadataRaw);
      return { markdownData, metadata };
    } catch (err) {
      if (err.code === "ENOENT") {
        const error = new Error("Post or metadata not found");
        error.status = 404;
        throw error;
      }
      console.error("Error processing post:", err);
      const error = new Error("Internal server error");
      error.status = 500;
      throw error;
    }
  }

  function updatePost(postName, content) {
    // TODO: Update the content of an existing post
  }

  function deletePost(postName) {
    // TODO: Delete an existing post
  }

  function postExists(postName) {
    // TODO: Check if the post file exists
  }

  return {
    readPosts,
    writePost,
    readPost,
    updatePost,
    deletePost,
    postExists,
  };
}

module.exports = createLocalSource;
