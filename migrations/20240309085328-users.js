module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      idusers: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true
      },
      username: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true
      },
      bio:{
        type: Sequelize.STRING, 
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      country:{
        type: Sequelize.STRING, 
        allowNull: false,
      },
      gender:{
        type: Sequelize.STRING, 
        allowNull: false,
      },
      rankpoints:{
        type: Sequelize.INTEGER, 
        allowNull: false,
        defaultValue: 0
      },
      instagramlink:{
        type: Sequelize.STRING, 
        allowNull: true,
      },
      facebooklink:{
        type: Sequelize.STRING, 
        allowNull: true,
      },
      verified:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false 
      },
      rankid:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ranks',
          key: 'idranks'
        },
        default:1
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
