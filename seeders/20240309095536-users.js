'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      { email: 'user1@gmail.com', username: 'user1', password: 'password1', dateOfBirth: '2000-01-01', country: 'lebanon', gender: 'Male', rankpoints: 0, verified: false, rankid: 1 ,updatedAt:'2024-03-09 12:45:25'},
      { email: 'user2@gmail.com', username: 'user2', password: 'password2', dateOfBirth: '2000-01-02', country: 'italia', gender: 'Female', rankpoints: 0, verified: false, rankid: 1,updatedAt:'2024-03-09 12:45:30' },
      { email: 'user3@gmail.com', username: 'user3', password: 'password3', dateOfBirth: '2000-01-03', country: 'germany', gender: 'Female', rankpoints: 0, verified: true, rankid: 1 ,updatedAt:'2024-03-09 12:45:35'},
      { email: 'user4@gmail.com', username: 'user4', password: 'password4', dateOfBirth: '2000-01-04', country: 'lebanon', gender: 'Male', rankpoints: 0, verified: false, rankid: 1 ,updatedAt:'2024-03-09 12:45:40'},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
