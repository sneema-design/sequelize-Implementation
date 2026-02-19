const { User,Post } = require("../models");
const { Op, where, INTEGER } = require("sequelize");
const createUser = async (req, res) => {
  try {
    console.log("user:", req.body);
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      include:[
        {model:Post,as:"posts"}
      ]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user= await User.findByPk(req.params.id);
    if(!user){
      return res.status(404).json({message:"no user found"});
    }
    const updatedUser=await user.update(req.body);
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
};

const deleteUser=async(req,res)=>{
  try {
    const user=await User.findByPk(req.params.id);
    if(!user){
      return res.status(404).json({message:"no user found"})
    }
    await user.destroy();
    res.status(200).json({message:"user deleted successfully"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

const filterUser=async(req,res)=>{
  try {
    const {minAge,maxAge}=req.query;
    const whereClause={}
    if(minAge && maxAge){
      whereClause.age={
        [Op.between]:[Number(minAge),Number(maxAge)]
      }
    }
    const users=await User.findAll({
      where:{
        age:{
        [Op.between]:[Number(minAge),Number(maxAge)]
      }
      }
    })
    if(!users){
      return res.status(404).json({message:"no user found"})
    }
    res.status(200).json(users)
  } catch (error) {
    
  }
}
module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  filterUser
};
