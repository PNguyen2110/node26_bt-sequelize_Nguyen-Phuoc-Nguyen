const express = require("express");

const { addOrders } = require("../../controllers/food.controllers");
const {
  getRestaurant,
  likeRestaurant,
  rateRestaurant,
  getRate,
} = require("../../controllers/restaurant.controllers");
const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../../controllers/users.controllers");

// path v1Router: /api/v1
const v1 = express.Router();

// định nghĩa các routers cho users
v1.get("/users", getUsers());
v1.post("/users", createUser());
v1.delete("/users/:id", deleteUser());
v1.put("/users/:id", updateUser());

// restaurants
v1.get("/restaurants", getRestaurant());
v1.post("/restaurants/:restaurantId/like", likeRestaurant());

// rate
v1.post("/restaurants/:restaurantId/rate", rateRestaurant());
v1.get("/restaurants/rate", getRate());

// oders
v1.post("/food/:foodId/orders", addOrders());

module.exports = v1;
