const { User, Post } = require("../models");
const cloudinary = require("../config/cloudinary");
const { Op } = require("sequelize");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/token.utils");
const { checkEmpty } = require("../utils/error");

const createUser = async (data, file) => {
  const checkUser = await User.findOne({
    where: {
      email: data.email,
    },
  });
  if (checkUser) {
    const error = new Error("Email Id already exists");
    error.statusCode = 409;
    throw error;
  }
  let imageUrl;
  let imagePublicId;
  if (file) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "profiles",
    });

    imageUrl = result.secure_url;
    imagePublicId = result.public_id;
  }

  const user = await User.create({
    ...data,
    image: file ? imageUrl : null,
    imagePublicId: imagePublicId,
  });
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    include: [{ model: Post, as: "posts" }],
  });
  return checkEmpty(users, "No User Found ");
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return checkEmpty(user, "No User Found ");
};

const updateUser = async (id, data, file) => {
  const user = await User.findByPk(id);
  if (!user) {
    const error = new Error("No Users found");
    error.statusCode = 404;
    throw error;
  }
  if (file) {
    if (user.imagePublicId) {
      await cloudinary.uploader.destroy(user.imagePublicId);
    }
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "profiles",
    });
    data.image = result.secure_url;
    data.imagePublicId = result.public_id;
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
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid password");
    error.statusCode = 401;
    throw error;
  }
  const access_token = generateAccessToken(user);
  const refresh_token = generateRefreshToken(user);
  user.refreshToken = refresh_token;
  await user.save();
  return { access_token, refresh_token };
};

const getUserByToken = async (token) => {
  const decoded = verifyAccessToken(token);
  const user = await User.findByPk(decoded.id);
  return checkEmpty(user, "No User Found ");
};

const refreshAccessToken = async (refresh_token) => {
  if (!refresh_token) {
    const error = new Error("Refresh token not provided");
    error.statusCode = 400;
    throw error;
  }
  const decoded = verifyRefreshToken(refresh_token);
  const user = await User.findByPk(decoded.id);
  if (!user || user.refreshToken !== refresh_token) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 401;
    throw error;
  }
  const newAccessToken = generateAccessToken(user);
  return { access_token: newAccessToken };
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
