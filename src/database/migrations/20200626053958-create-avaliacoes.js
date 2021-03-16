'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('avaliacoes',{ 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        comentario: {
          type: Sequelize.STRING, 
        },
        
        avaliacao: {
          type: Sequelize.INTEGER, 
          allowNull: false,
        },
        
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        
        receita_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'receitas', key: 'id' },
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
    return queryInterface.dropTable('avaliacoes');
  }
};
