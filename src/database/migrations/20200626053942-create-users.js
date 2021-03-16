'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
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
      
      nascimento: {
        type: Sequelize.DATE, 
        allowNull: false,
      },
      
      user: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true
      },
      
      bio: {
        type: Sequelize.STRING(1234), 
      },
      
      cidade: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      
      uf: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      
      nacionalidade: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      
      email: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true
      },
      
      telefone: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      
      senha: {
        type: Sequelize.STRING, 
        allowNull: false,
        select: false
      },
      
      senharesettoken: {
        type: Sequelize.STRING
      },
      
      senharesetexpires: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('users');
  }
};
