const commentService = require("../service/comment.Service");

const createComments = async (req, res,next) => {
  try {
    const comment = await commentService.createComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

const getAllComments = async (req, res,next) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
const getCommentsById = async (req, res,next) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Please provide a id");
    }
    const comment = await commentService.getCommentById(id);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
const getCommentsByUserId = async (req, res,next) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Please Provide a user Id");
    }
    const comment = await commentService.getCommentsByUserId(id);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
const getCommentsByPostId = async (req, res,next) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Please Provide a Post Id");
    }
    const comments = await commentService.getCommentsByPostId(id);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createComments,
  getAllComments,
  getCommentsById,
  getCommentsByUserId,
  getCommentsByPostId,
};
