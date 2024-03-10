'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('reportcategories', [
      { categoryname: 'Abuse' },
      { categoryname: 'Spam' },
      { categoryname: 'Hate Speech' },
      { categoryname: 'Inappropriate Speech' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reportcategories', null, {});
  }
};
