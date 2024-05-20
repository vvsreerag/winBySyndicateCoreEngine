"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PatternOddEven extends Model {
    static associate(models) {
      // define association here
    }
  }
  PatternOddEven.init(
    {
      pattern_odd_even_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      type_1: DataTypes.INTEGER,
      type_2: DataTypes.INTEGER,
      type_3: DataTypes.INTEGER,
      type_4: DataTypes.INTEGER,
      type_5: DataTypes.INTEGER,
      type_6: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "pattern_odd_even",
      timestamps: false,
    }
  );
  return PatternOddEven;
};
