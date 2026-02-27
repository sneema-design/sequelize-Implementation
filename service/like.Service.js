const { User, Post, Like } = require("../models");

const create_like = async (data) => {
  const like = await Like.create(data);
  return like;
};

const get_AllLikes = async () => {
  const likes = await Like.findAll();
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
    throw new Error("no like by this id");
  }
  return like;
};
const get_LikeByUserId = async (id) => {
  const like = await Like.findAll({
    where: {
      userId: id,
    },
    include: [
      { model: User, as: "user" },
      { model: Post, as: "post" },
    ],
  });
  if(!like){
    throw new Error("there is no like by this user")
  }
  return like
};
const get_LikeByPostId=async(id)=>{
    const like=await Like.findAll({
        where:{
            postId:id
        },
        include:[
            {model:User,as:"user"},
            {model:Post,as:"post"}
        ]
    })
    if(!like){
        throw new Error("there is no like on this post")
    }
    return like
}
module.exports = {
  create_like,
  get_AllLikes,
  get_LikeById,
  get_LikeByUserId,
  get_LikeByPostId
};
