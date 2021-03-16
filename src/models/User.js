const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING, 
            nascimento: DataTypes.DATE, 
            user: DataTypes.STRING, 
            bio: DataTypes.STRING, 
            cidade: DataTypes.STRING, 
            uf: DataTypes.STRING, 
            nacionalidade: DataTypes.STRING, 
            email: DataTypes.STRING, 
            telefone: DataTypes.STRING,
            senha: DataTypes.STRING,
            senharesettoken: DataTypes.STRING,
            senharesetexpires: DataTypes.DATE,
        }, {
            sequelize,
            hooks: {//criptografia de senha
                beforeCreate: (user) => {
                  const salt = bcrypt.genSaltSync();
                  user.senha = bcrypt.hashSync(user.senha, salt);
                }
              },
              instanceMethods: {
                validPassword: function(password) {
                  return bcrypt.compareSync(password, this.senha);
                }
              } 
        })
    }

    static associate(models){
        this.hasMany(models.Receitas, { foreignKey: 'user_id', as: 'paireceitas' })//tem varias receitas
    }
    static associate2(models){
        this.hasMany(models.Avaliacoes, { foreignKey: 'user_id', as: 'paiavaliacoes' })//tem (fez) varias avaliacoes
    }
    static associate3(models){
        this.hasMany(models.Respostas, { foreignKey: 'user_id', as: 'pairespostas' })//tem (fez) varias respostas para as avaliacoes
    }
    static associate4(models){
        this.hasMany(models.Avatars, { foreignKey: 'user_id', as: 'paiavatars' })//tem (fez) varias respostas para as avaliacoes
    }
    static associate5(models){
        this.hasMany(models.Fotos, { foreignKey: 'user_id', as: 'paifotos' })//tem (fez) varias respostas para as avaliacoes
    }
}

/* User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}; */

/* User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}; */
module.exports = User;