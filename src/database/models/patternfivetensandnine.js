"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PatternFiveTensAndNine extends Model {
    static associate(models) {
      PatternFiveTensAndNine.belongsTo(models.pattern_thirty_twentynine, {
        foreignKey: "pattern_thirty_twentynine_id",
        onDelete: "CASCADE",
      });
    }
  }
  PatternFiveTensAndNine.init(
    {
      pattern_five_tens_nine_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      column_1: DataTypes.INTEGER,
      column_2: DataTypes.INTEGER,
      column_3: DataTypes.INTEGER,
      column_4: DataTypes.INTEGER,
      column_5: DataTypes.INTEGER,
      column_6: DataTypes.INTEGER,
      total_combination: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "pattern_five_tens_nine",
      timestamps: false,
    }
  );
  return PatternFiveTensAndNine;
};
