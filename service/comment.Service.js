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

  if (!comments.length) {
    throw new Error("Comments not found");
  }

  return comments;
};

const getCommentsById=async(id)=>{
    const comment= await Comment.findByPk(id);
    if(!comment){
        throw new Error("no comment found")
    }
    return comment
}

const getCommentsByUserId=async(id)=>{
    const comments=await  Comment.findAll({
        where:{
            userId:id
        }
    })
    if(!comments.length){
        throw new Error("no comment found")
    }
    return comments
}
const getCommentsByPostId=async(id)=>{
    const comments=await Comment.findAll({
        where:{
            postId:id
        }
    })
     if(!comments.length){
        throw new Error("no comment found")
    }
    return comments

}


module.exports = {
  createComment,
  getAllComments,
  getCommentsById,
  getCommentsByUserId,
  getCommentsByPostId
};