const fs = require("fs/promises");
const path = require("path");

async function loadPosts() {
  const postsDir = path.join(__dirname, "..", "..", "posts");

  const getJsonFiles = async (dirPath) => {
    const files = await fs.readdir(dirPath);
    return files.filter((file) => file.endsWith(".json"));
  };

  const jsonFiles = await getJsonFiles(postsDir);

  const posts = await Promise.all(
    jsonFiles.map(async (file) => {
      const filePath = path.join(postsDir, file);
      const content = await fs.readFile(filePath, "utf-8");
      return JSON.parse(content);
    })
  );

  return posts.filter(({ published }) => published);
}

module.exports = loadPosts;
