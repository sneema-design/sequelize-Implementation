const { sequelize, User, Transaction } = require("../models");
const transaction = require("../models/transaction");

const cashIn = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findByPk(userId, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!user) {
        throw new Error("User not found");
      }

      const parsedAmount = parseFloat(amount);

      if (parsedAmount <= 0) {
        throw new Error("Invalid amount");
      }

      user.balance = parseFloat(user.balance) + parsedAmount;

      await user.save({ transaction: t });

      const trans = await Transaction.create(
        {
          userId,
          type: "cash_in",
          amount: parsedAmount,
        },
        { transaction: t },
      );

      return res.status(200).json({
        transaction: trans,
        user_balance: user.balance,
      });
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const cashOut = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const result = await sequelize.transaction(async (t) => {

      const user = await User.findByPk(userId, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!user) {
        throw new Error("User not found");
      }

      const parsedAmount = parseFloat(amount);

      if (parsedAmount <= 0) {
        throw new Error("Invalid amount");
      }

      const currentBalance = parseFloat(user.balance);

      if (currentBalance < parsedAmount) {
        throw new Error("User doesn't have enough balance");
      }

      user.balance = parseFloat(
        (currentBalance - parsedAmount).toFixed(2)
      );

      await user.save({ transaction: t });

      const trans = await Transaction.create(
        {
          userId,
          type: "cash_out",
          amount: parsedAmount,
        },
        { transaction: t }
      );

      return {
        transaction: trans,
        user_balance: user.balance,
      };
    });

    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  cashIn,cashOut
};
