const { Restaurant, User } = require("../models");

const getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findAll({
      // lấy toàn bộ
      // include: "userLikes"

      // chỉ lấy userLikes
      include: {
        association: "userLikes",
        through: {
          attributes: [],
        },
        // không lấy key email
        // attributes: {
        //   exclude: ["email", "password"],
        // },
      },

      // thêm key cần lấy
      // include: [
      //   "user",
      //   {
      //     association: "userLikes",
      //     through: {
      //       attributes: ["createdAt"],
      //     },
      //   },
      // ],
    });
    return restaurant;
  } catch (err) {
    throw err;
  }
};

const likeRestaurant = async (userId, restaurantId) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "Restaurant not found");
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }
    console.log(restaurant.__proto__);

    // khi thiết lập relationship cho các model,
    // mặc định sequelize sẽ tạo ra các phương thức
    // cho model để tương tác với model khác
    const userLike = await restaurant.hasUserLike(user.id);
    if (userLike) {
      await restaurant.removeUserLike(user.id);
    } else {
      await restaurant.addUserLike(user.id);
    }
    return null;
  } catch (err) {
    throw err;
  }
};

// rate_res
const rateRestaurant = async (userId, resId, amount) => {
  try {
    const res = await Restaurant.findByPk(resId);
    if (!res) {
      throw new AppError(400, "Restaurant not found");
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }
    console.log(res.__proto__);
    const userRate = await res.hasUserRate(user.id);
    if (userRate) {
      await res.removeUserRate(user.id);
    } else {
      await res.addUserRate(user.id, {
        through: { amount: amount },
      });
    }
    return null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//

const getRate = async () => {
  try {
    const rate = await Restaurant.findAll({
      include: {
        association: "userRate",
        through: {
          attributes: [],
        },
      },
    });
    return rate;
  } catch (err) {
    throw err;
  }
};

//

module.exports = {
  getRestaurant,
  likeRestaurant,
  rateRestaurant,
  getRate,
};
