const { Post, User, Comment } = require("../models");
const comment = require("../models/comment");

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    const post = await Post.findAll({
      include: [
        { model: User, as: "users" },
        { model: Comment, as: "comments" },
      ],
    });
    if (post.length===0) {
      return res.status(404).json({ message: error.message });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={
    createPost,
    getAllPost
}