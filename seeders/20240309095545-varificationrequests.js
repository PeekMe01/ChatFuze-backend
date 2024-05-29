'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('verificationrequests', [
      { imagepath: 'path1', userid: 1 },
      { imagepath: 'path2', userid: 2 },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('verificationrequests', null, {});
  }
};
