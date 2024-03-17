module.exports = (sequelize, DataTypes) => {
    const ResetPassword = sequelize.define('ResetPassword', {
      idresetpassword: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userid: {
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
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
    }, {
      tableName: 'resetpassword', 
      timestamps: false 
    });
  
    return ResetPassword;
  };
  