module.exports = (sequelize, DataTypes) => {
    const Ranks = sequelize.define("Ranks", {
        idranks: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        rankname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        minimumpoints: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maximumpoints: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        modelName: 'Ranks',
        tableName: 'ranks'
    });

    return Ranks;
};
