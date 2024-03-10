module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define('Messages', {
      idmessages: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      senderid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'idusers'
        }
      },
      receiverid: {
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
      tableName: 'messages', 
      timestamps: true, 
    });
  
    return Messages;
  };
  