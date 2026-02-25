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
    await queryInterface.addColumn('Posts',"image",{
      type: Sequelize.STRING,
      defaultValue:"",
    })
    await queryInterface.renameColumn("Posts","content","caption");
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn(
      "Posts",
      "caption",
      "content"
    );
    await queryInterface.dropColumn("Posts","image");
  }
};
