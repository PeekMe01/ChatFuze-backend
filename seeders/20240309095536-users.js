'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      { email: 'user1@gmail.com', username: 'user1',bio:'bio for user1' ,password: 'password1', dateOfBirth: '2000-01-01', country: 'lebanon', gender: 'Male', rankpoints: 0, verified: false, rankid: 1 ,updatedAt:'2024-03-09 12:45:25'},
      { email: 'user2@gmail.com', username: 'user2',bio:'bio for user2', password: 'password2', dateOfBirth: '2000-01-02', country: 'syria', gender: 'Female', rankpoints: 200, verified: false, rankid: 2,updatedAt:'2024-03-09 12:45:30' },
      { email: 'user3@gmail.com', username: 'user3', password: 'password3', dateOfBirth: '2000-01-03', country: 'germany', gender: 'Female', rankpoints: 150, verified: true, rankid: 2 ,updatedAt:'2024-03-09 12:45:35'},
      { email: 'user4@gmail.com', username: 'user4', password: 'password4', dateOfBirth: '2000-01-04', country: 'lebanon', gender: 'Male', rankpoints: 110, verified: false, rankid: 2 ,updatedAt:'2024-03-09 12:45:40'},
      { email: 'user5@gmail.com', username: 'user5',bio:'bio for user5' ,password: 'password5', dateOfBirth: '2000-01-05', country: 'france', gender: 'Female', rankpoints: 58, verified: true, rankid: 1 ,updatedAt:'2024-03-09 12:45:45'},
      { email: 'user6@gmail.com', username: 'user6', password: 'password6', dateOfBirth: '2000-01-06', country: 'france', gender: 'Male', rankpoints: 250, verified: false, rankid: 3 ,updatedAt:'2024-03-09 12:45:50'},
      { email: 'user7@gmail.com', username: 'user7', password: 'password7', dateOfBirth: '2000-01-07', country: 'france', gender: 'Male', rankpoints: 350, verified: false, rankid: 4 ,updatedAt:'2024-03-09 12:45:55'},
      { email: 'user8@gmail.com', username: 'user8',bio:'bio for user8', password: 'password8', dateOfBirth: '2000-01-08', country: 'syria', gender: 'Female', rankpoints: 290, verified: true, rankid: 3 ,updatedAt:'2024-03-09 12:46:00'},
      { email: 'user9@gmail.com', username: 'user9', password: 'password9', dateOfBirth: '2000-01-09', country: 'lebanon', gender: 'Male', rankpoints: 0, verified: false, rankid: 1 ,updatedAt:'2024-03-09 12:46:05'},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
