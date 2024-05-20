module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoomRequests', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },country:{
        type: Sequelize.STRING, 
        allowNull: false,
      },
      gender:{
        type: Sequelize.STRING, 
        allowNull: false,
      },
      minimumAge: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      maximumAge: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      intrests: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      userdid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'idusers'
        }
      },
     createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RoomRequests');
  }
};
