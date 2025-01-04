import Post from "./postModel.js";

const getAllPosts = async (_req, res) => {
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

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostsBySender = async (req, res) => {
  try {
    const posts = await Post.find({ sender_id: req.query.sender });

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this sender" });
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.post_id, req.body, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllPosts, createNewPost, getPostById, getPostsBySender, updatePost };
