'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('messages', [
      { message: 'Message 1', senderid: 1, receiverid: 2 },
      { message: 'Message 2', senderid: 2, receiverid: 1 },
      // Add 3 more messages here
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('messages', null, {});
  }
};
