'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('friendslist', [
      { usersid1: 1, usersid2: 2, createdAt: '2024-03-09 12:45:25', updatedAt: '2024-03-09 12:45:25' },
      { usersid1: 3, usersid2: 1, createdAt: '2024-03-09 12:45:35', updatedAt: '2024-03-09 12:45:35' },
      { usersid1: 1, usersid2: 4, createdAt: '2024-03-09 12:45:45', updatedAt: '2024-03-09 12:45:45' },
      { usersid1: 5, usersid2: 1, createdAt: '2024-03-09 12:45:55', updatedAt: '2024-03-09 12:45:55' },
      { usersid1: 1, usersid2: 6, createdAt: '2024-03-09 12:46:05', updatedAt: '2024-03-09 12:46:05' },
      { usersid1: 7, usersid2: 1, createdAt: '2024-03-09 12:46:15', updatedAt: '2024-03-09 12:46:15' },
      { usersid1: 1, usersid2: 8, createdAt: '2024-03-09 12:46:25', updatedAt: '2024-03-09 12:46:25' },
      { usersid1: 2, usersid2: 3, createdAt: '2024-03-09 12:46:35', updatedAt: '2024-03-09 12:46:35' },
      { usersid1: 4, usersid2: 2, createdAt: '2024-03-09 12:46:45', updatedAt: '2024-03-09 12:46:45' },
      { usersid1: 2, usersid2: 5, createdAt: '2024-03-09 12:46:55', updatedAt: '2024-03-09 12:46:55' },
      { usersid1: 6, usersid2: 2, createdAt: '2024-03-09 12:47:05', updatedAt: '2024-03-09 12:47:05' },
      { usersid1: 2, usersid2: 7, createdAt: '2024-03-09 12:47:15', updatedAt: '2024-03-09 12:47:15' },
      { usersid1: 2, usersid2: 8, createdAt: '2024-03-09 12:47:25', updatedAt: '2024-03-09 12:47:25' },
      { usersid1: 3, usersid2: 4, createdAt: '2024-03-09 12:47:35', updatedAt: '2024-03-09 12:47:35' },
      { usersid1: 3, usersid2: 5, createdAt: '2024-03-09 12:47:45', updatedAt: '2024-03-09 12:47:45' },
      { usersid1: 6, usersid2: 3, createdAt: '2024-03-09 12:47:55', updatedAt: '2024-03-09 12:47:55' },
      { usersid1: 7, usersid2: 3, createdAt: '2024-03-09 12:48:05', updatedAt: '2024-03-09 12:48:05' },
      { usersid1: 3, usersid2: 8, createdAt: '2024-03-09 12:48:15', updatedAt: '2024-03-09 12:48:15' },
      { usersid1: 4, usersid2: 5, createdAt: '2024-03-09 12:48:25', updatedAt: '2024-03-09 12:48:25' },
      { usersid1: 4, usersid2: 6, createdAt: '2024-03-09 12:48:35', updatedAt: '2024-03-09 12:48:35' },
      { usersid1: 4, usersid2: 7, createdAt: '2024-03-09 12:48:45', updatedAt: '2024-03-09 12:48:45' },
      { usersid1: 8, usersid2: 4, createdAt: '2024-03-09 12:48:55', updatedAt: '2024-03-09 12:48:55' },
      { usersid1: 5, usersid2: 6, createdAt: '2024-03-09 12:49:05', updatedAt: '2024-03-09 12:49:05' },
      { usersid1: 7, usersid2: 5, createdAt: '2024-03-09 12:49:15', updatedAt: '2024-03-09 12:49:15' },
      { usersid1: 5, usersid2: 8, createdAt: '2024-03-09 12:49:25', updatedAt: '2024-03-09 12:49:25' },
      { usersid1: 6, usersid2: 7, createdAt: '2024-03-09 12:49:35', updatedAt: '2024-03-09 12:49:35' },
      { usersid1: 6, usersid2: 8, createdAt: '2024-03-09 12:49:45', updatedAt: '2024-03-09 12:49:45' },
      { usersid1: 7, usersid2: 8, createdAt: '2024-03-09 12:49:55', updatedAt: '2024-03-09 12:49:55' },
      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('friendslist', null, {});
  }
};
