const { User, Post, Comment } = require("../models");
const create_Post = async (data, file) => {
    const postData = {
      title: data.title,
      image: file ? file.name : null,
      userId: data.userId,
      caption: data.caption,
    };
    const post = await Post.create(postData);
    return post;
};
const get_AllPost = async () => {

    const post = await Post.findAll({
      include: [
        { model: User, as: "user" },
        { model: Comment, as: "comments" },
      ],
    });
    
  if (post.length === 0) {
    const error = new Error("No posts found");
    error.statusCode = 404;
    throw error;
  }

    return post;
  
};
const get_PostById = async (id) => {
  
    const post = await Post.findByPk(id, {
      include: [
        { model: User, as: "user" },
        { model: Comment, as: "comments" },
      ],
    });
    if (!post) {
      const error =new Error("No post Found by this Id")
      error.statusCode=404;
      throw error
    }
    return post;
   
};
const delete_PostById = async (id) => {

    const post= await Post.findByPk(id);
    if(!post){
        const error=new Error("No post found by this Id")
        error.statusCode(404)
        throw error;
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
   if(!post){
        const error=new Error("No post found By this UserId")
        error.statusCode(404)
        throw error;
    }
  return post;
}
const update_PostById=async(id,data,file)=>{
  const post=await Post.findByPk(id);
  if(!post){
        const error=new Error("No post found By this UserId")
        error.statusCode(404)
        throw error;
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
