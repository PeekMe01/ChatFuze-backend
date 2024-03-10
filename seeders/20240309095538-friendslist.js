'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('friendslist', [
      { usersid1: 1, usersid2: 2,createdAt:'2024-03-09 12:45:25', updatedAt:'2024-03-09 12:45:25'},
      { usersid1: 1, usersid2: 3 ,createdAt:'2024-03-09 12:45:35', updatedAt:'2024-03-09 12:45:35'},
      // Add 3 more friends here
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('friendslist', null, {});
  }
};
