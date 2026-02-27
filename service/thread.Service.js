const { Comment, User, Thread } = require("../models");

const createThread = async (data) => {
  const thread = await Thread.create(data);
  return thread;
};
const getAllThread = async () => {
  const threads = await Thread.findAll();
  if (!threads) {
    throw new Error("no threads are there");
  }
  return threads;
};
const getThreadById = async (id) => {
  const thread = await Thread.findByPk(id);
  if (!thread) {
    throw new Error("no thread avaliable");
  }
  return thread;
};
const getThreadByCommentId = async (id) => {
  const thread = await Thread.findAll({
    where: {
      commentId: id,
    },
    include: [
      { model: Comment, as: "comment" },
      { model: User, as: "user" },
    ],
  });
  if (!thread) {
    throw new Error("No thread found");
  }
  return thread;
};
module.exports = {
  createThread,
  getAllThread,
  getThreadByCommentId,
  getThreadById,
};
