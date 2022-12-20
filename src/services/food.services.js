const { Food, Order, User } = require("../models");

const addOrders = async (data, foodId) => {
  try {
    console.log("data", data.amount);
    console.log("data", data.userId);
    console.log("data", data.code);
    const food = await Food.findByPk(foodId);
    const user = await User.findByPk(data.userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }
    console.log("food", food);
    console.log("user", user);
    if (!food) {
      throw new AppError(400, "Food not found");
    }
    const createdOrders = await food.addUserOrder(user.id, {
      through: {
        amount: data.amount,
        code: data.code,
        userId: data.userId,
      },
    });
    console.log(food.__proto__);
    return createdOrders;
  } catch (err) {}
};

module.exports = {
  addOrders,
};
