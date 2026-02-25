// controllers/user.controller.js
const userService = require("../service/user.Service");

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body, req.file);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.id,
      req.body,
      req.file
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const filterUser = async (req, res, next) => {
  try {
    const { minAge, maxAge } = req.query;
    const users = await userService.filterUser(minAge, maxAge);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const {access_token,refresh_token} = await userService.login(
      req.body.email,
      req.body.password
    );
    res.status(200).json({ access_token,refresh_token });
  } catch (error) {
    next(error);
  }
};

const getUserByToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await userService.getUserByToken(token);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const refreshAccess_Token=async(req,res,next)=>{
  try {
    const access_token=await userService.refreshAccessToken(
      req.body.refresh_token
    )
    res.status(200).json({access_token:access_token})
  } catch (error) {
    next(error)
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
  getUserByToken,
  refreshAccess_Token
};