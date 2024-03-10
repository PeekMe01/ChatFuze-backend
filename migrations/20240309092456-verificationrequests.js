module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('verificationrequests', {
      idverificationrequests: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      imagepath: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'idusers'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('verificationrequests');
  }
};
