const {Model, DataTypes} = require('sequelize');

class Avaliacoes extends Model {
    static init(sequelize) {
        super.init({
            comentario: DataTypes.STRING, 
            avaliacao: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Receitas, { foreignKey: 'receita_id', as: 'filhoreceitas' })//pertencte a uma receita
    }
    static associate2(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'filhousers' })//pertence a um usuario
    }
    static associate3(models){
        this.hasMany(models.Respostas, { foreignKey: 'avaliacao_id', as: 'pairespostas' })//tem varias respostas
    }
}

module.exports = Avaliacoes;