'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('feedbacks', [
      { userdid: 1 ,message: 'This is the first feedback message.',createdAt: new Date(), updatedAt: new Date() },
      {  userdid: 2,message: 'Another feedback message.', createdAt: new Date(), updatedAt: new Date() },
      { userdid: 1 ,message: 'This is the second feedback message.',createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('feedbacks', null, {});
  }
};
