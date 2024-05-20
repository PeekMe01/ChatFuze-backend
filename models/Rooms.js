module.exports = (sequelize, DataTypes) => {
    const Rooms = sequelize.define('Rooms', {
      idmessages: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userdid1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'idusers'
        }
      },
      userdid2: {
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
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'rooms', // Specify the table name if it's different from the model name
      timestamps: false, // Disable timestamps since we have createdAt and deletedAt columns
      hooks: {
        beforeCreate: (room) => {
          // Add 2 hours to the current time for createdAt
          room.createdAt = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);
        }
      }
    });
  
    return Rooms;
  };
  