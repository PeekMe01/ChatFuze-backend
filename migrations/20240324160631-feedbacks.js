module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('feedbacks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userdid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'idusers'
        }
      },
     message:{
      type: Sequelize.STRING,
      allowNull: false,
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
    await queryInterface.dropTable('feedbacks');
  }
};
