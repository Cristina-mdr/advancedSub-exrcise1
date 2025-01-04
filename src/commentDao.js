import Comment from "./commentModel.js";
import Post from "./postModel.js";

const createNewComment = async (req, res) => {
  try {
    const { post_id } = req.body;
    const postExists = await Post.findById(post_id);
    
    if (!postExists) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = new Comment({
      post_id: post_id,
      comment: req.body.comment,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.post_id });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createNewComment, getCommentsByPostId };
