import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    postId: Schema.Types.ObjectId,
    comment: String,
  },
  { collection: "Comments" }
);

const Comment = model("Post", commentSchema);

export default Comment;
