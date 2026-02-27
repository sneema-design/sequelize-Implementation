'use strict';

const comment = require('../models/comment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("Threads",{
      id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:Sequelize.INTEGER,
      },
      userid:{
        type:Sequelize.INTEGER,
        reference:{
              model:"Users",
              key:"id"
        },
        allowNull:false,
        onDelete:"CASCADE"

      },
      commentId:{
        allowNull:false,
        reference:{
          model:"Comments",
          key:"id"
        },
        type:Sequelize.INTEGER,
        onDelete:"CASCADE"
      },
      content:{
        allowNull:false,
        type:Sequelize.INTEGER,
      },
      createdAt:{
        allowNull:false,
        type:Sequelize.DATE
      },
      updateAt:{
        allowNull:false,
        type:Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Threads');
  }
};
