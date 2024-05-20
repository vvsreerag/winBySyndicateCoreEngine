"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PatternThirtyTwentyNine extends Model {
    static associate(models) {
      PatternThirtyTwentyNine.hasMany(models.pattern_five_tens_nine, {
        foreignKey: "pattern_thirty_twentynine_id",
      });
    }
  }
  PatternThirtyTwentyNine.init(
    {
      pattern_thirty_twentynine_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      bucket_30: DataTypes.INTEGER,
      bucket_30_59: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "pattern_thirty_twentynine",
      timestamps: false,
    }
  );
  return PatternThirtyTwentyNine;
};
