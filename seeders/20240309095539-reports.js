'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('reports', [
      { message: 'Report 1', reportcategorieid: 1, reporterid: 1, reportedid: 2, status: 'pending' },
      { message: 'Report 2', reportcategorieid: 2, reporterid: 2, reportedid: 1, status: 'dismissed' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reports', null, {});
  }
};
