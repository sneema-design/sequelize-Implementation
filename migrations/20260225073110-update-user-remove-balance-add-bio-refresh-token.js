'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Users","bio",{
      type:Sequelize.STRING,
      defaultValue:"",
      allowNull: false,
    }),
    await queryInterface.addColumn("Users","refreshToken",{
      type:Sequelize.STRING,
      defaultValue:"",
      allowNull: true
    }),
    await queryInterface.removeColumn("Users", "balance");

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.addColumn("Users", "balance", {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0.0,
    });

    // Remove bio
    await queryInterface.removeColumn("Users", "bio");

    // Remove refreshToken
    await queryInterface.removeColumn("Users", "refreshToken");
  }
};
