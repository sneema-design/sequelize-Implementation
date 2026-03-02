// services/user.service.js
const jwt = require("jsonwebtoken");
const { User, Post } = require("../models");
const { Op } = require("sequelize");

const createUser = async (data, file) => {
  const checkUser = await User.findOne({where:{
    email:data.email
  }});
  if (checkUser) {
    const error = new Error("Email Id already exists");
    error.statusCode = 409;
    throw error;
  }
  const user = await User.create({
    data,
    image: file ? file.filename : null,
  });
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    include: [{ model: Post, as: "posts" }],
  });
  if (users.length === 0) {
    const error = new Error("No Users found");
    error.statusCode = 404;
    throw error;
  }
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    const error = new Error("No Users found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

const updateUser = async (id, data, file) => {
  const user = await User.findByPk(id);
  if (!user) {
    const error = new Error("No Users found");
    error.statusCode = 404;
    throw error;
  }
  if (file) {
    data.image = file.filename;
  }

  return await user.update(data);
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    const error = new Error("No Users found");
    error.statusCode = 404;
    throw error;
  }
  await user.destroy();
  return true;
};

const filterUser = async (minAge, maxAge) => {
  const whereClause = {};

  if (minAge && maxAge) {
    whereClause.age = {
      [Op.between]: [Number(minAge), Number(maxAge)],
    };
  }

  return await User.findAll({ where: whereClause });
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error("No Users found");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Password is not correct");
    error.statusCode = 401;
    throw error;
  }

  const access_token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );
  const refresh_token = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });

  user.refreshToken = refresh_token;
  await user.save();

  return { access_token, refresh_token };
};

const getUserByToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findByPk(decoded.id);
  if (!user) {
    const error = new Error("No Users found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};
const refreshAccessToken = async (refresh_token) => {
  if (!refresh_token) {
    throw new Error("refresh token not provided");
  }
  const decoded = jwt.verify(refresh_token, process.env.REFRESH_SECRET);
  const user = User.findByPk(decoded.id);
  if (!user) {
    const error = new Error("No Users found");
    error.statusCode = 404;
    throw error;
  }
  const access_token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );
  return access_token;
};
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  filterUser,
  login,
  getUserByToken,
  refreshAccessToken,
};
