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

    await queryInterface.addColumn("personal_trainers", "userId", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    });

    await queryInterface.addColumn("personal_trainers", "memberId", {
      type: Sequelize.INTEGER,
      references: {
        model: "members",
        key: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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

    await queryInterface.removeColumn("personal_trainers", "userId");
    await queryInterface.removeColumn("personal_trainers", "memberId");
  },
};
