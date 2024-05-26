module.exports = (sequelize, DataTypes) => {
  const FriendsRequest = sequelize.define('FriendsRequest', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    friendid1: {
      type: DataTypes.INTEGER,
    },
    friendid2: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'friendsrequests',
    timestamps: true, 
  });
  return FriendsRequest;
};
