module.exports = (sequelize, DataTypes) => {
  const RoomRequests = sequelize.define('RoomRequests', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },country:{
      type: DataTypes.STRING, 
      allowNull: false,
    },
    gender:{
      type: DataTypes.STRING, 
      allowNull: false,
    },
    minimumAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maximumAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    intrests: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    userdid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'idusers'
      }
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
    tableName: 'roomrequests', 
    timestamps: false 
  });
  RoomRequests.associate = (models) => {
    RoomRequests.belongsTo(models.Users, {
      foreignKey: 'userdid',
      as: 'users'
    });
  };

  return RoomRequests;
};
