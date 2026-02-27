const { Model } = require("sequelize");
const { create_like, get_AllLikes, get_LikeById, get_LikeByUserId, get_LikeByPostId } = require("../service/like.Service");

const createLike=async(req,res)=>{
    try {
        const{userId,postId}=req.body;
        if(!userId||!postId){
            throw new Error("userId Or PostId is missing")
        }
        const like= await create_like(req.body);
        res.status(200).json(like)
    } catch (error) {
        throw new Error(error)
    }
}
const getAllLikes=async(req,res)=>{
    try {
        const likes= await get_AllLikes();
        if(!likes){
            throw new Error("no likes till now");
        }
        res.status(200).json(likes)
    } catch (error) {
        throw new Error(error);
    }
}
const getLikeById=async(req,res)=>{
    try {
        const id=req.params.id;
        if(!id){
           throw new Error("Please Provide a Id");
        }
        const like= await get_LikeById(id);
        res.status(200).json(like);
    } catch (error) {
        throw new Error(error)
    }
}
const getLikeByUserId=async(req,res)=>{
    try {
        const id= req.params.id;
        if(!id){
            throw new Error("Please provide a userId")
        }
        const like=await get_LikeByUserId(id);
        res.status(200).json(like)
    } catch (error) {
        throw new Error(error)
    }
}
const getLikeByPostId=async(req,res)=>{
    try {
        const id=req.params.id;
        if(!id){
            throw new Error("Please provide a postId")
        }
        const like= await get_LikeByPostId(id);
        res.status(200).json(like)
    } catch (error) {
        throw new Error(error)
    }
}
module.exports={
    createLike,
    getAllLikes,
    getLikeById,
    getLikeByUserId,
    getLikeByPostId
}