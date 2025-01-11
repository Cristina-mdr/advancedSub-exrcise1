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

const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedComment)
      return res.status(404).json({ error: "Comment not found" });
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment)
      return res.status(404).json({ error: "Comment not found" });
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createNewComment, getCommentsByPostId, updateComment, deleteComment };
