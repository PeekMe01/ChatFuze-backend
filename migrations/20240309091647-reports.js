module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
      idreports: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tenmessage: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      reportcategorieid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'reportcategories',
          key: 'idreportcategories'
        }
      },
      reporterid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'idusers'
        }
      },
      reportedid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'idusers'
        }
      },
      status: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'pending'
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
    await queryInterface.dropTable('reports');
  }
};
