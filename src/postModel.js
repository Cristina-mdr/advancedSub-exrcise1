import {Schema, model} from "mongoose";

const PostSchema = new Schema({
    text: String
});

const Post = model('Post' , PostSchema)

export default Post;