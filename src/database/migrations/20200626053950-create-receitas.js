'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('receitas',{ 
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
        
        ingredientes: {
          type: Sequelize.STRING(1234), 
          allowNull: false,
        },
        
        preparo: {
          type: Sequelize.STRING(1234), 
          allowNull: false,
        },
        
        maisinfos: {
          type: Sequelize.STRING,
        },
        
        categoria: {
          type: Sequelize.STRING, 
          allowNull: false,
        },
        
        sabor: {
          type: Sequelize.STRING, 
          allowNull: false,
        },
        
        cultura: {
          type: Sequelize.STRING,
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
      return queryInterface.dropTable('receitas');
  }
};
