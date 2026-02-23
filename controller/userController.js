const jwt  = require("jsonwebtoken");
const { User,Post } = require("../models");
const { Op, where, INTEGER } = require("sequelize");
const createUser = async (req, res, next) => {
  try {
    console.log("body:", req.body);
    console.log("file:", req.file);

    const {
      firstName,
      lastName,
      email,
      age,
      password,
      balance
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      age,
      password,
      balance,
      image: req.file ? req.file.filename : null
    });

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error); 
  }
}
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
const login=async(req,res)=>{
  try {
    const {email,password} =req.body;
    const user= await User.findOne({where:{email}});
    if(!user){
      return res.status(404).json({message:"user not found"});
    }
    const isMatch= await user.comparePassword(password);
    if(!isMatch){
      return res.status(401).json({message:"password is wrong"})
    }
    const token=jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
    res.status(200).json({token})
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}
const getUserByToken=async(req,res)=>{
  try {
    const token =req.headers.authorization.split(" ")[1];
    const decoded= await jwt.verify(token,process.env.JWT_SECRET);
    const id=decoded.id;
    const user =await User.findByPk(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}
module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  filterUser,
  login,
  getUserByToken
};
