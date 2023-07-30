"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("members", "userId", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    });
    await queryInterface.addColumn("members", "personalTrainerId", {
      type: Sequelize.INTEGER,
      references: {
        model: "personal_trainers",
        key: "id",
      },
    });
    await queryInterface.addColumn("members", "packageId", {
      type: Sequelize.INTEGER,
      references: {
        model: "packages",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("members", "userId");
    await queryInterface.removeColumn("members", "personalTrainerId");
    await queryInterface.removeColumn("members", "packageId");
  },
};
