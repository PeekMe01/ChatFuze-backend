module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        idusers: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rankpoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        instagramlink: {
            type: DataTypes.STRING,
            allowNull: true
        },
        facebooklink: {
            type: DataTypes.STRING,
            allowNull: true
        },
        snapchatlink: {
            type: DataTypes.STRING,
            allowNull: true
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        rankid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        modelName: 'Users',
        tableName: 'users'
    });

    Users.associate = (models) => {
        Users.belongsTo(models.Ranks, { foreignKey: 'rankid', as: 'rank' });
    };

    return Users;
};
