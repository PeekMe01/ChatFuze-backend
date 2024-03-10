module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      idmessages: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      message: {
        type: Sequelize.TEXT, 
        allowNull: false,
      },
      senderid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'idusers'
        }
      },
      receiverid: {
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
    await queryInterface.dropTable('messages');
  }
};
