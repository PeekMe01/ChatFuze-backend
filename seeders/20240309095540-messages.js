'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('messages', [
      { message: 'Message 1', senderid: 1, receiverid: 2 },
      { message: 'Message 2', senderid: 2, receiverid: 1 },
      { message: 'Message 3', senderid: 3, receiverid: 1 },
      { message: 'Message 4', senderid: 4, receiverid: 2 },
      { message: 'Message 5', senderid: 5, receiverid: 3 },
      { message: 'Message 6', senderid: 6, receiverid: 4 },
      { message: 'Message 7', senderid: 7, receiverid: 5 },
      { message: 'Message 8', senderid: 8, receiverid: 6 },
      { message: 'Message 9', senderid: 1, receiverid: 3 },
      { message: 'Message 10', senderid: 2, receiverid: 4 },
      { message: 'Message 11', senderid: 3, receiverid: 2 },
      { message: 'Message 12', senderid: 4, receiverid: 1 },
      { message: 'Message 13', senderid: 5, receiverid: 6 },
      { message: 'Message 14', senderid: 6, receiverid: 7 },
      { message: 'Message 15', senderid: 7, receiverid: 8 },
      { message: 'Message 16', senderid: 8, receiverid: 7 },
     
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('messages', null, {});
  }
};
