'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ranks', [
      { rankname: 'Beginner', minimumpoints: 0, maximumpoints: 150 },
      { rankname: 'Amateur', minimumpoints: 151, maximumpoints: 300 },
      { rankname: 'Expert', minimumpoints: 301, maximumpoints: 500 },
      { rankname: 'Master', minimumpoints: 501, maximumpoints: 700 },
      { rankname: 'Champ', minimumpoints: 701, maximumpoints: 1000 },
      { rankname: 'Superstar', minimumpoints: 701, maximumpoints: 1000 }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ranks', null, {});
  }
};
