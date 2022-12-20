const { response } = require("../helpers/response");
const restaurantServices = require("../services/restaurant.services");
const getRestaurant = () => {
  return async (req, res, next) => {
    try {
      const restaurant = await restaurantServices.getRestaurant();
      res.status(200).json(response(restaurant));
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};

// post localhost:4000/restaurant/:restaurantId/like
const likeRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.body;
      const { restaurantId } = req.params;
      await restaurantServices.likeRestaurant(userId, restaurantId);
      res.status(200).json("ok");
    } catch (err) {
      next(err);
    }
  };
};

// rate

const rateRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { userId, amount } = req.body;
      const { restaurantId } = req.params;
      await restaurantServices.rateRestaurant(userId, restaurantId, amount);
      res.status(200).json(response("success"));
    } catch (err) {
      next(err);
    }
  };
};

//

const getRate = () => {
  return async (req, res, next) => {
    try {
      const rate = await restaurantServices.getRate();
      console.log(rate);
      res.status(200).json(response(rate));
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  getRestaurant,
  likeRestaurant,
  rateRestaurant,
  getRate,
};
