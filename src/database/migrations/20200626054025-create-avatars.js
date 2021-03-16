'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('avatars',{ 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      
      size: {
        type: Sequelize.INTEGER, 
        allowNull: false,
      },
      
      key: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

    });
},

down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('avatars');
}
};
