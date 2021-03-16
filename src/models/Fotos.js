const {Model, DataTypes} = require('sequelize');

class Fotos extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            size: DataTypes.INTEGER,
            key: DataTypes.STRING,
            url: DataTypes.STRING,
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
}

module.exports = Fotos;