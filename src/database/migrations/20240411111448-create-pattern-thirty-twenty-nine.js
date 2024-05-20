"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pattern_thirty_twentynines", {
      pattern_thirty_twentynine_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bucket_30: {
        type: Sequelize.INTEGER,
      },
      bucket_30_59: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pattern_thirty_twentynines");
  },
};
