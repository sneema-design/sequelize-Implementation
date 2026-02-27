const threadService = require("../service/thread.Service");

const createThread = async (req, res) => {
  try {
    const thread = await threadService.createThread(req.body);
    res.status(200).json(thread);
  } catch (error) {
    throw new Error(error);
  }
};
const getAllThread = async (req, res) => {
  try {
    const thread = await threadService.getAllThread();
    res.status(200).json(thread);
  } catch (error) {
    throw new Error(error);
  }
};

const getThreadById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id.length) {
      throw new Error("Please provide a id");
    }
    const thread = await threadService.getThreadById(id);
    res.status(200).json(thread);
  } catch (error) {
    throw new Error(error);
  }
};

const getThreadByCommentId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id.length) {
      throw new Error("Please provide a id");
    }
    const thread = await threadService.getThreadByCommentId(id);
    res.status(200).json(thread);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createThread,
  getAllThread,
  getThreadById,
  getThreadByCommentId,
};
