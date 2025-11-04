const express = require("express");
const router = express.Router();

const auth = require('../middlewares/Auth');
const Forum = require("../controllers/Forum");

router.get("/", Forum.getPosts);
router.post("/", auth(), Forum.createPost);
router.post("/:id", auth(), Forum.addComment);
router.patch("/:id", auth(), Forum.updatePost);
router.delete("/:id", auth(), Forum.deletePost);

module.exports = router;
