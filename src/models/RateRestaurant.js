const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "RateRestaurant", // tên model
    // định nghĩa
    {
      usId: {
        type: DataTypes.INTEGER,
        field: "us_id",
      },

      resId: {
        type: DataTypes.INTEGER,
        field: "res_id",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      amount: {
        type: DataTypes.INTEGER,
      },
    },

    //options
    {
      tableName: "rate_restaurants",
      // disabled createAt, updateAt
      timestamps: false,
      //bỏ qua password khi tìm kiếm record (user)
    }
  );
};
