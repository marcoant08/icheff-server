const {Model, DataTypes} = require('sequelize');

class Respostas extends Model {
    static init(sequelize) {
        super.init({
            resposta: DataTypes.STRING, 
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Avaliacoes, { foreignKey: 'avaliacao_id', as: 'filhoavaliacao' })//pertence a uma avaliacao
    }
    static associate2(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'filhousers' })//pertence a um usuario
    }
}

module.exports = Respostas;