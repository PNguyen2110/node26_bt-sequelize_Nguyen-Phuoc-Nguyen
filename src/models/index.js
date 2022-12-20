// set up sequelize
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node26-food", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
  port: "3306",
});

(async () => {
  try {
    await sequelize.authenticate();
  } catch (e) {
    console.log(e);
  }
})();

const User = require("./User")(sequelize);
const Restaurant = require("./Restaurant")(sequelize);
const RestaurantLikes = require("./RestaurantLike")(sequelize);
const RateRestaurant = require("./RateRestaurant")(sequelize);
const Food = require("./Food")(sequelize);
const Order = require("./Order")(sequelize);

// định nghĩa mối quan hệ giữa các models
Restaurant.belongsTo(User, { as: "user", foreignKey: "userId" });
User.hasMany(Restaurant, { as: "restaurant", foreignKey: "userId" });
// relationship user vs food

// định nghĩa relationship giữa các model

// user 1 - n Restaurantlikes
// restaurant 1 -n RestaurantLikes
Restaurant.belongsToMany(User, {
  as: "userLikes",
  through: RestaurantLikes,
  foreignKey: "restaurantId",
});
User.belongsToMany(Restaurant, {
  as: "restaurantLikes",
  through: RestaurantLikes,
  foreignKey: "userId",
});
// user 1 - n RateRestaurant
// restaurant 1 -n RateRestaurant
Restaurant.belongsToMany(User, {
  as: "userRate",
  through: RateRestaurant,
  foreignKey: "resId",
});
User.belongsToMany(Restaurant, {
  as: "rateRes",
  through: RateRestaurant,
  foreignKey: "usId",
});

// food 1 - n orders
// user 1 - n orders
User.belongsToMany(Food, {
  as: "addByUser",
  through: Order,
  foreignKey: "userId",
});
Food.belongsToMany(User, {
  as: "userOrders",
  through: Order,
  foreignKey: "foodId",
});

module.exports = {
  sequelize,
  User,
  Restaurant,
  Food,
  Order,
};
