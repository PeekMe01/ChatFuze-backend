module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reportcategories', {
      idreportcategories: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
    await queryInterface.dropTable('reportcategories');
  }
};
