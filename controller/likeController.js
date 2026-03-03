const {
  create_like,
  get_AllLikes,
  get_LikeById,
  get_LikeByUserId,
  get_LikeByPostId,
} = require("../service/like.Service");
const { checkId } = require("../utils/error");

const createLike = async (req, res, next) => {
  try {
    const like = await create_like(req.body);
    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
};
const getAllLikes = async (req, res, next) => {
  try {
    const likes = await get_AllLikes();
    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
};
const getLikeById = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    checkId(id);
    const like = await get_LikeById(id);
    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
};
const getLikeByUserId = async (req, res, next) => {
  try {
    const {id} = req.params.id;
    checkId(id)
    const like = await get_LikeByUserId(id);
    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
};
const getLikeByPostId = async (req, res, next) => {
  try {
    const {id} = req.params.id;
    checkId(id);
    const like = await get_LikeByPostId(id);
    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createLike,
  getAllLikes,
  getLikeById,
  getLikeByUserId,
  getLikeByPostId,
};
