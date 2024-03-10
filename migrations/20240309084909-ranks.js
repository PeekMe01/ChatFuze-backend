module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ranks', {
      idranks: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rankname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      minimumpoints: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      maximumpoints: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('ranks');
  }
};
