const Post = require("../models/Post");
const handlerAsync = require("../middlewares/HandlerAsync");
const { resp } = require("../helpers");

exports.getPosts = handlerAsync(async (req, res) => {
  const posts = await Post.find()
    .populate("author", "name email")
    .populate("comments.author", "name email")
    .sort({ createdAt: -1 });

  resp(res, 200, "Fetched all posts", { posts });
});

exports.createPost = handlerAsync(async (req, res) => {
  const { title, content } = req.body;
  const author = req.token.id;

  const post = await Post.create({ title, content, author });
  resp(res, 201, "Post created successfully", { post });
});

exports.updatePost = handlerAsync(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = await Post.findById(id);
  if (!post) return resp(res, 404, "Post not found");

  // Optional: restrict edit to author or admin
  if (post.author.toString() !== req.token.id.toString() && req.token.role !== "admin")
    return resp(res, 403, "Unauthorized");

  if (title) post.title = title;
  if (content) post.content = content;
  await post.save();

  resp(res, 200, "Post updated successfully", { post });
});

exports.deletePost = handlerAsync(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return resp(res, 404, "Post not found");

  if (post.author.toString() !== req.token.id.toString() && req.token.role !== "admin")
    return resp(res, 403, "Unauthorized");

  await post.deleteOne();
  resp(res, 200, "Post deleted successfully");
});

exports.addComment = handlerAsync(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const author = req.token.id;

  const post = await Post.findById(id);
  if (!post) return resp(res, 404, "Post not found");

  post.comments.push({ content, author });
  await post.save();

  resp(res, 201, "Comment added successfully", { post });
});
