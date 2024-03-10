module.exports = (sequelize, DataTypes) => {
    const VerificationRequest = sequelize.define('VerificationRequest', {
      idverificationrequests: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      imagepath: {
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
      tableName: 'verificationrequests', // Specify the table name if it's different from the model name
      timestamps: false // Disable timestamps since we have createdAt column
    });
  
    return VerificationRequest;
  };
  