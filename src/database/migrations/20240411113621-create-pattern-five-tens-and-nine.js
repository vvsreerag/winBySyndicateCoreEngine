"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pattern_five_tens_nines", {
      pattern_five_tens_nine_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pattern_thirty_twentynine_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pattern_thirty_twentynines",
          key: "pattern_thirty_twentynine_id",
          as: "pattern_thirty_twentynine_id",
        },
        onDelete: "CASCADE",
      },
      column_1: {
        type: Sequelize.INTEGER,
      },
      column_2: {
        type: Sequelize.INTEGER,
      },
      column_3: {
        type: Sequelize.INTEGER,
      },
      column_4: {
        type: Sequelize.INTEGER,
      },
      column_5: {
        type: Sequelize.INTEGER,
      },
      column_6: {
        type: Sequelize.INTEGER,
      },
      total_combination: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pattern_five_tens_nines");
  },
};
