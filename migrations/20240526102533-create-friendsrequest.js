'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('friendsrequests', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      friendid1: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'idusers'
        }
      },friendid2: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'idusers'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('friendsrequests');
  }
};