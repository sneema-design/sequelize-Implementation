const { Post, User, Comment } = require("../models");

const createComments=async(req,res)=>{
    try {
        const comment= await Comment.create(req.body);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllComments=async(req,res)=>{
    try {
        const comments= await Comment.findAll({include:[
            {model:Post,as:"posts"},
            {model:User,as:"users"}
        ]});
        if(comments.length==0){
            return res.status(404).json(
                {message:"comments not found"}
            )
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

model.exports={
    createComments,
    getAllComments
}