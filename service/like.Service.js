const { User, Post, Like } = require("../models");
const { checkEmpty } = require("../utils/error");

const create_like = async (data) => {
  const like = await Like.create(data);
  return like;
};

const get_AllLikes = async () => {
  const likes = await Like.findAll();
  
  return checkEmpty(likes, "Like Not Found");
};

const get_LikeById = async (id) => {
  const like = await Like.findByPk(id, {
    include: [
      { model: User, as: "user" },
      { model: Post, as: "post" },
    ],
  });

  return checkEmpty(like, "Like Not Found By This Id");
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
  
  return checkEmpty(likes, "Like Not Found By This Id");
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

  return checkEmpty(likes, "Like Not Found On This PostId");
};
module.exports = {
  create_like,
  get_AllLikes,
  get_LikeById,
  get_LikeByUserId,
  get_LikeByPostId,
};
