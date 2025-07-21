const config = require("./config");
const { getSource } = require("./source");

const blog_route = config.blog_route;

async function getAllPosts(req, res) {
  try {
    const { readPosts } = getSource();
    const posts = await readPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createPost(req, res) {
  try {
    const { writePost } = getSource();
    const { markdown, metadata } = req.body;
    const slug = await writePost({ markdown, metadata });

    res.status(201).json({
      message: "Post created successfully",
      redirectUrl: `${blog_route}/${slug}`,
    });
  } catch (error) {
    console.error(error);
    if (error.message === "Missing slug in metadata") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Error saving files" });
  }
}

async function getPostByName(req, res) {
  try {
    const { readPost } = getSource();
    const postData = await readPost(req.params.postName);
    res.status(200).json(postData);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

async function updatePost(req, res) {
  res.json({ message: "Post route is working ✅" });
}

async function deletePost(req, res) {
  res.json({ message: "Post route is working ✅" });
}

module.exports = {
  getAllPosts,
  createPost,
  getPostByName,
  updatePost,
  deletePost,
};
