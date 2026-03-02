const { User, Post, Like } = require("../models");

const create_like = async (data) => {
  const like = await Like.create(data);
  return like;
};

const get_AllLikes = async () => {
  const likes = await Like.findAll();
  if (likes.length === 0) {
    const error = new Error("No like found By This Id");
    error.statusCode = 404;
    throw error;
  }
  return likes;
};

const get_LikeById = async (id) => {
  const like = await Like.findByPk(id, {
    include: [
      { model: User, as: "user" },
      { model: Post, as: "post" },
    ],
  });
  if (!like) {
    const error = new Error("No like found By This Id");
    error.statusCode = 404;
    throw error;
  }
  return like;
};
const get_LikeByUserId = async (id) => {
  const likes = await Like.findAll({
    where: {
      userId: id,
    },
    include: [
      { model: User, as: "user" },
      { model: Post, as: "post" },
    ],
  });
  if (likes.length === 0) {
    const error = new Error("No like found By This Id");
    error.statusCode = 404;
    throw error;
  }
  return likes;
};
const get_LikeByPostId = async (id) => {
  const likes = await Like.findAll({
    where: {
      postId: id,
    },
    include: [
      { model: User, as: "user" },
      { model: Post, as: "post" },
    ],
  });
  if (likes.length === 0) {
    const error = new Error("No like found By This Id");
    error.statusCode = 404;
    throw error;
  }
  return likes;
};
module.exports = {
  create_like,
  get_AllLikes,
  get_LikeById,
  get_LikeByUserId,
  get_LikeByPostId,
};
