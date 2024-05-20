"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pattern_odd_evens", {
      pattern_odd_even_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type_1: {
        type: Sequelize.INTEGER,
      },
      type_2: {
        type: Sequelize.INTEGER,
      },
      type_3: {
        type: Sequelize.INTEGER,
      },
      type_4: {
        type: Sequelize.INTEGER,
      },
      type_5: {
        type: Sequelize.INTEGER,
      },
      type_6: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pattern_odd_evens");
  },
};
