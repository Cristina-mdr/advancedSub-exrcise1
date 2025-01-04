import Post from "./postModel.js";

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNewPost = async (req, res) => {
  try {
    const post = Post({ message: req.body.message });
    const savedPost = await post.save();
    res.status(201).json(savedPost);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllPosts, createNewPost };
