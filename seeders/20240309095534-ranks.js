'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ranks', [
      { rankname: 'Beginner', minimumpoints: 0, maximumpoints: 100 },
      { rankname: 'Amateur', minimumpoints: 101, maximumpoints: 200 },
      { rankname: 'Expert', minimumpoints: 201, maximumpoints: 300 },
      { rankname: 'Master', minimumpoints: 301, maximumpoints: 400 },
      { rankname: 'Champ', minimumpoints: 401, maximumpoints: 1000 },
      { rankname: 'Superstar', minimumpoints: 401, maximumpoints: 1000 }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ranks', null, {});
  }
};
