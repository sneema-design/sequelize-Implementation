const {
  create_Post,
  get_AllPost,
  get_PostById,
  delete_PostById,
  get_PostByUserId,
  update_PostById,
} = require("../service/post.Service");
const { checkId } = require("../utils/error");
const createPost = async (req, res, next) => {
  try {
    const post = await create_Post(req.body, req.file);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const getAllPost = async (req, res, next) => {
  try {
    const post = await get_AllPost();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
const getPostById = async (req, res, next) => {
  try {
    const {id} = req.params.id;
    checkId(id);
    const post = await get_PostById(id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
const deletePostById = async (req, res, next) => {
  try {
    const {id}=req.params.id;
    checkId(id)
    await delete_PostById(id);
    res.status(200).json({ message: "post delete sucessfully" });
  } catch (error) {
    next(error);
  }
};
const getPostByUserId = async (req, res, next) => {
  try {
    const post = await get_PostByUserId(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
const updatePostById = async (req, res, next) => {
  try {
    const post = await update_PostById(req.params.id, req.body, req.file);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createPost,
  getAllPost,
  getPostById,
  deletePostById,
  getPostByUserId,
  updatePostById,
};
