const { User, Post, Comment } = require("../models");
const create_Post = async (data, file) => {
  try {
    const postData = {
      title: data.title,
      image: file ? file.name : null,
      userId: data.userId,
      caption: data.caption,
    };
    const post = await Post.create(postData);
    return post;
  } catch (error) {
    throw new Error(error);
  }
};
const get_AllPost = async () => {
  try {
    const post = await Post.findAll({
      include: [
        { model: User, as: "user" },
        { model: Comment, as: "comments" },
      ],
    });
    if (post.lenght === 0) {
      throw new Error("No post exists");
    }
    return post;
  } catch (error) {
    throw new Error(error);
  }
};
const get_PostById = async (id) => {
  try {
    const post = await Post.findByPk(id, {
      include: [
        { model: User, as: "user" },
        { model: Comment, as: "comments" },
      ],
    });
    if (!post) {
      throw new Error("Post does not exist");
    }
    return post;
  } catch (error) {
    throw new Error(error);
  }
};
const delete_PostById = async (id) => {

    const post= await Post.findByPk(id);
    if(!post){
        throw new Error("Post doen't exists");
    }
    await post.destroy();
    return true;
  
};

const get_PostByUserId=async(id)=>{
  const post=await Post.findAll({
    where:{
      userId:id
    }
  })
  return post;
}
const update_PostById=async(id,data,file)=>{
  const post=await Post.findByPk(id);
  if(!post){
    throw new Error("was not able to find the post ")
  }
  if(file){
    data.image=file.filename;
  }
  return await post.update(data);

}
module.exports = {
  create_Post,
  get_AllPost,
  get_PostById,
  delete_PostById,
  get_PostByUserId,
  update_PostById
};
