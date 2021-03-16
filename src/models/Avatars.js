const {Model, DataTypes} = require('sequelize');

class Avatars extends Model {
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
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'filhousers' })
    }
}

module.exports = Avatars;    