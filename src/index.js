//Cristina-Modritski-212099600-Ido-Lapidot-211673306
import { connect } from "mongoose";
import dotenv from "dotenv";
import express from "express";
import {
  getAllPosts,
  createNewPost,
  getPostById,
  getPostsBySender,
  updatePost,
} from "./postDao.js";
import cors from "cors";
import {
  createNewComment,
  deleteComment,
  updateComment,
  getCommentsByPostId,
} from "./commentDao.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/posts", getAllPosts);
app.post("/post/create", createNewPost);
app.get("/post/:post_id", getPostById);
app.get("/post", getPostsBySender);
app.put("/post/:post_id", updatePost);

app.get("/comment/:post_id", getCommentsByPostId);
app.post("/comment/create", createNewComment);
app.put("/comment/:id", updateComment);
app.delete("/comment/:id", deleteComment);

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
