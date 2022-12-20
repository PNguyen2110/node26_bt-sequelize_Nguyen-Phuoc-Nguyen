const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Order",
    {
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      foodId: {
        type: DataTypes.INTEGER,
        field: "food_id",
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "orders",
      timestamps: false,
    }
  );
};
