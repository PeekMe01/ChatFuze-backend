'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('friendslist', [
      { usersid1: 1, usersid2: 2 },
      { usersid1: 1, usersid2: 3 },
      // Add 3 more friends here
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('friendslist', null, {});
  }
};
