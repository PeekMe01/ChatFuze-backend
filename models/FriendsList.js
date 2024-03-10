module.exports = (sequelize, DataTypes) => {
    const FriendsList = sequelize.define('FriendsList', {
      usersid1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'idusers'
        }
      },
      usersid2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
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
      tableName: 'friendslist',
      timestamps: true, 
    });
    return FriendsList;
  };
  