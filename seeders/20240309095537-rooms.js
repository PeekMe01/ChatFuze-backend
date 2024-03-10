'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('rooms', [
      { userdid1: 1, userdid2: 2 },
      { userdid1: 1, userdid2: 3 },
      // Add 3 more rooms here
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rooms', null, {});
  }
};
