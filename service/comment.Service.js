const { Comment, Post, User } = require("../models");

const createComment = async (data) => {
  const comment = await Comment.create(data);
  return comment;
};

const getAllComments = async () => {
  const comments = await Comment.findAll({
    include: [
      { model: Post, as: "posts" },
      { model: User, as: "users" },
    ],
  });

  if (comments.length === 0) {
    const error = new Error("Comments not found");
    error.statusCode = 404;
    throw error;
  }

  return comments;
};

const getCommentById = async (id) => {
  const comment = await Comment.findOne({
    where: { id },
    include: [
      {
        model: Comment,
        as: "replies",
        include: [{ model: User, as: "users" }],
      },
      { model: User, as: "users" },
    ],
  });

  if (!comment) {
    const error = new Error("Comment not found");
    error.statusCode = 404;
    throw error;
  }
  return comment;
};

const getCommentsByUserId = async (id) => {
  const comments = await Comment.findAll({
    where: {
      userId: id,
    },
  });

  if (comments.length === 0) {
    const error = new Error("NO Comments by this user");
    error.statusCode = 404;
    throw error;
  }
  return comments;
};
const getCommentsByPostId = async (id) => {
  const comments = await Comment.findAll({
    where: {
      postId: id,
    },
  });
  if (comments.length === 0) {
    const error = new Error("No Comments on the Post");
    error.statusCode = 404;
    throw error;
  }
  return comments;
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  getCommentsByUserId,
  getCommentsByPostId,
};
