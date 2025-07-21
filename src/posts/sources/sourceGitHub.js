const { default: simpleGit } = require("simple-git");
const fs = require("fs");
const path = require("path");
const createLocalSource = require("./sourceLocal");

async function createGithubSource(baseDir, repoUrl) {
  const repoDir = path.join(baseDir, "repository");

  let repoGit;

  if (!fs.existsSync(repoDir)) {
    console.log("📥 Cloning repository...");
    await simpleGit().clone(repoUrl, repoDir);
    console.log("✅ Repository cloned at:", repoDir);

    repoGit = simpleGit(repoDir);
    await repoGit.addConfig("user.name", "BlogItBot");
    await repoGit.addConfig("user.email", "blogitbot@example.com");
    console.log("🤖 Git user configured as BlogItBot");
  } else {
    console.log("📁 Repository already exists at:", repoDir);
    repoGit = simpleGit(repoDir);
  }

  const localSource = createLocalSource(repoDir);

  async function pullChanges() {
    try {
      await repoGit.fetch();

      const status = await repoGit.status();
      if (status.behind > 0) {
        const result = await repoGit.pull("origin", "main");
        console.log("🔄 Pulled latest changes");
        return result;
      } else {
        console.log("✅ Already up to date, no pull needed");
        return null;
      }
    } catch (error) {
      console.error("❌ Pull failed:", error);
      throw error;
    }
  }

  async function pushChanges(message = "update posts") {
    try {
      await repoGit.add(".");
      const commitMessage = `🤖 blogitbot says: ${message}`;
      await repoGit.commit(commitMessage);
      const result = await repoGit.push("origin", "main");
      console.log("🚀 Push successful");
      return result;
    } catch (error) {
      console.error("❌ Push failed:", error);
      throw error;
    }
  }

  return {
    async readPosts() {
      await pullChanges();
      const result = await localSource.readPosts();
      return result;
    },

    async writePost(content) {
      await pullChanges();
      const result = await localSource.writePost(content);
      await pushChanges(`posts /${result} writed`);
      return result;
    },

    async readPost(postName) {
      await pullChanges();
      const result = await localSource.readPost(postName);
      return result;
    },

    async updatePost(postName, content) {
      const result = await localSource.updatePost(postName, content);
      return result;
    },

    async deletePost(postName) {
      const result = await localSource.deletePost(postName);
      return result;
    },

    async postExists(postName) {
      const result = await localSource.postExists(postName);
      return result;
    },
  };
}

module.exports = createGithubSource;
