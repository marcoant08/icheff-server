const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const sequelize = require('sequelize');
const User = require('../models/User');
const Receitas = require('../models/Receitas');
const Avaliacoes = require('../models/Avaliacoes');
const Respostas = require('../models/Respostas');
const Fotos = require('../models/Fotos');
const Avatars = require('../models/Avatars');

//const teste1 = new Sequelize("icheffdb", 'root', '', { host: 'localhost', dialect: "mysql"}) 

const connection = new sequelize(dbConfig);

connection.authenticate().then(function(){
    console.log('conectado');
}).catch(function(){
    console.log('falha');
})

User.init(connection);
Receitas.init(connection);
Avaliacoes.init(connection);
Respostas.init(connection);
Avatars.init(connection);
Fotos.init(connection);

User.associate(connection.models);
User.associate2(connection.models);
User.associate3(connection.models);
User.associate4(connection.models);
User.associate5(connection.models);

Receitas.associate(connection.models);
Receitas.associate2(connection.models);
Receitas.associate3(connection.models);

Avaliacoes.associate(connection.models);
Avaliacoes.associate2(connection.models);
Avaliacoes.associate3(connection.models);

Respostas.associate(connection.models);
Respostas.associate2(connection.models);

Avatars.associate(connection.models);

Fotos.associate(connection.models);
Fotos.associate2(connection.models);

module.exports = connection;
