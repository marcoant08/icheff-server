const {Model, DataTypes} = require('sequelize');

class Receitas extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING, 
            ingredientes: DataTypes.STRING(1234), 
            preparo: DataTypes.STRING(1234), 
            maisinfos: DataTypes.STRING, 
            categoria: DataTypes.STRING, 
            sabor: DataTypes.STRING, 
            cultura: DataTypes.STRING, 
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'filhousers' })
    }
    static associate2(models){
        this.hasMany(models.Avaliacoes, { foreignKey: 'receita_id', as: 'paiavaliacoes' })
    }
    static associate3(models){
        this.hasMany(models.Fotos, { foreignKey: 'receita_id', as: 'paifotos' })
    }
}

module.exports = Receitas;