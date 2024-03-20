'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('rooms', [
      { userdid1: 1, userdid2: 2 },
      { userdid1: 1, userdid2: 3 },
      { userdid1: 1, userdid2: 4 },
      { userdid1: 1, userdid2: 5 },
      { userdid1: 1, userdid2: 6 },
      { userdid1: 1, userdid2: 7 },
      { userdid1: 1, userdid2: 8 },
      { userdid1: 2, userdid2: 3 },
      { userdid1: 2, userdid2: 4 },
      { userdid1: 2, userdid2: 5 },
      { userdid1: 2, userdid2: 6 },
      { userdid1: 2, userdid2: 7 },
      { userdid1: 2, userdid2: 8 },
      { userdid1: 3, userdid2: 4 },
      { userdid1: 3, userdid2: 5 },
      { userdid1: 3, userdid2: 6 },
      { userdid1: 3, userdid2: 7 },
      { userdid1: 3, userdid2: 8 },
      { userdid1: 4, userdid2: 5 },
      { userdid1: 4, userdid2: 6 },
      { userdid1: 4, userdid2: 7 },
      { userdid1: 4, userdid2: 8 },
      { userdid1: 5, userdid2: 6 },
      { userdid1: 5, userdid2: 7 },
      { userdid1: 5, userdid2: 8 },
      { userdid1: 6, userdid2: 7 },
      { userdid1: 6, userdid2: 8 },
      { userdid1: 7, userdid2: 8 },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rooms', null, {});
  }
};
