const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Food",
    {
      foodId: {
        type: DataTypes.INTEGER,
        field: "food_id",
        autoIncrement: true,
        primaryKey: true,
      },
      foodName: {
        type: DataTypes.STRING,
        field: "food_name",
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      des: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // typeId:{
      //     type: DataTypes.INTEGER,
      //     field:"type_id",
      //     foreignKey:true
      // }
    },
    {
      tableName: "food",
      timestamps: false,
    }
  );
};
