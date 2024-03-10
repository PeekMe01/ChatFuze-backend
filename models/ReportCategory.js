module.exports = (sequelize, DataTypes) => {
    const ReportCategory = sequelize.define('ReportCategory', {
      idreportcategories: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      categoryname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'reportcategories', 
      timestamps: true, 
    });
    return ReportCategory;
  };
  