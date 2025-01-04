import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    message: { type: String },
    sender_id: { type: String}
  },
  { collection: "Posts" }
);

const Post = model("Post", PostSchema);

export default Post;
