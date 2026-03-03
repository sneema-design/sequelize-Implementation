const { Comment, Post, User } = require("../models");
const { checkEmpty } = require("../utils/error");

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

  return checkEmpty(comments, "Comments Not Found");
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

  return checkEmpty(comment, "Comments Not Found");
};

const getCommentsByUserId = async (id) => {
  const comments = await Comment.findAll({
    where: {
      userId: id,
    },
  });
  return checkEmpty(comments, "Comments Not Found");
};
const getCommentsByPostId = async (id) => {
  const comments = await Comment.findAll({
    where: {
      postId: id,
    },
  });
  return checkEmpty(comments, "Comments Not Found");
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  getCommentsByUserId,
  getCommentsByPostId,
};
