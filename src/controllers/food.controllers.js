const { response } = require("../helpers/response");
const foodServices = require("../services/food.services");

const addOrders = () => {
  return async (req, res, next) => {
    try {
      const user = req.body;
      const { foodId } = req.params;
      const orders = await foodServices.addOrders(user, foodId);
      console.log(orders);
      res.status(200).json(response(orders));
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  addOrders,
};
