module.exports = (sequelize, DataTypes) => {
    const Reports = sequelize.define('Reports', {
      idreports: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reportcategorieid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ReportCategories',
          key: 'idreportcategories'
        }
      },
      reporterid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'idusers'
        }
      },
      reportedid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'idusers'
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'reports', // Specify the table name if it's different from the model name
      timestamps: false // Disable timestamps since we have createdAt and updatedAt columns
    });
  
    return Reports;
  };
  