const { Error } = require("sequelize");
const commentService = require("../service/comment.Service");

const createComments = async (req, res) => {
  try {
    const comment = await commentService.createComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    if (error.message === "Comments not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
const getCommentsById=async(req,res)=>{
    try {
        const id=req.params.id;
        if(!id){
            throw new Error("Please provide a id");
        }
        const comment=await commentService.getCommentById(id);
        res.status(200).json(comment)
    } catch (error) {
        throw new Error(error)
    }
}
const getCommentsByUserId=async(req,res)=>{
    try {
        const id=req.params.id;
        if(!id){
            throw new Error("Please Provide a user Id")
        }
        const comment = await commentService.getCommentsByUserId(id);
        res.status(200).json(comment);
    } catch (error) {
        throw new Error(error)
    }
}
const getCommentsByPostId=async(req,res)=>{
    try {
         const id=req.params.id;
        if(!id){
            throw new Error("Please Provide a Post Id")
        }
        const comments=await commentService.getCommentsByPostId(id);
        res.status(200).json(comments)
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
  createComments,
  getAllComments,
  getCommentsById,
  getCommentsByUserId,
  getCommentsByPostId
};