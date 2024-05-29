'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('resetpassword', [
      { email: 'user1@example.com', token: 'token1', userid: 1 },
      { email: 'user2@example.com', token: 'token2', userid: 2 },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('resetpassword', null, {});
  }
};
