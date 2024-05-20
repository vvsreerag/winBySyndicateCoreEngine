"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "pattern_thirty_twentynines",
      [
        { bucket_30: 6, bucket_30_59: 0 },
        { bucket_30: 5, bucket_30_59: 1 },
        { bucket_30: 4, bucket_30_59: 2 },
        { bucket_30: 3, bucket_30_59: 3 },
        { bucket_30: 2, bucket_30_59: 4 },
        { bucket_30: 1, bucket_30_59: 5 },
        { bucket_30: 0, bucket_30_59: 6 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pattern_thirty_twentynines", null, {});
  },
};
