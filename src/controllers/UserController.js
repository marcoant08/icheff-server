const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const bcrypt = require('bcryptjs');

module.exports = {
    async index(req, res){
        const usuarios = await User.findAll();

        return res.json(usuarios);
    },
    
    async me(req, res){
        const { userId } = req;

        const usuario = await User.findByPk(userId);

        return res.json(usuario);
    },
    
    async updtsenha(req, res){
        const { userId } = req;

        const { antigasenha, novasenha } = req.body;

        const usuario = await User.findByPk(userId);

        if(!usuario){
            return res.status(400).send({error: 'Usuario não encontrado.'});
        }

        if(!await bcrypt.compare(antigasenha, usuario.senha)){
            return res.status(400).send({error: 'Senha incorreta.'});
        }
        
        const salt = bcrypt.genSaltSync();
            
        await usuario.update({
            senha: bcrypt.hashSync(novasenha, salt)
        })

        return res.json({message: "Senha alterada."})
    },

    async del(req, res){
        const { userId } = req;
        console.log(userId)
        const usuario = await User.findByPk(userId);

        if(!usuario){
            return res.status(400).send({error: 'User not found.'})
        }
        if(userId !== usuario.id){
            return res.status(400).send({error: 'Token error.'})
        }
        
        console.log(usuario.id, req.userId)
        /* if(usuario.id !== req.userId){
            return res.status(400).send({error: 'You cannot delete this user.'})
        } */
        
        await usuario.destroy();
        
        return res.json({message: "user deletado."});
    },

    async updt(req, res){
        const { userId } = req;
        const usuario = await User.findByPk(userId);

        if(!usuario){
            return res.status(400).send({error: 'User não encontrado.'})
        }

        if(userId != usuario.id){
            return res.status(400).send({error: 'Erro de Token.'})
        }

        const {  
            nome, 
            nascimento, 
            user, 
            bio,
            cidade, 
            uf, 
            nacionalidade, 
            email, 
            telefone
        } = req.body
        
        const us = await User.findOne({ where: { user } })
        if(!!us && us.id !== userId){
            return res.status(400).send({error: 'Este username já existe.'})
        }

        const em = await User.findOne({ where: { email } })
        if(!!em && em.id !== userId){
            return res.status(400).send({error: 'Email já cadastrado.'})
        }

        await usuario.update({
            nome, 
            nascimento, 
            user,  
            bio,
            cidade, 
            uf, 
            nacionalidade, 
            email, 
            telefone
        })

        return res.json(usuario);
    },

    async store(req, res) {
        const {  
            nome, 
            nascimento, 
            user, 
            cidade, 
            uf, 
            nacionalidade, 
            email, 
            telefone,
            senha,
            senharesettoken,
            senharesetexpires
        } = req.body;

        if(await User.findOne({ where: { user } })){
            return res.status(400).send({error: 'Este username já existe.'})
        }

        if(await User.findOne({ where: { email } })){
            return res.status(400).send({error: 'Email já cadastrado.'})
        }

        const usuario = await User.create({  
            nome, 
            nascimento, 
            user, 
            cidade, 
            uf, 
            nacionalidade, 
            email, 
            telefone,
            senha,
            senharesettoken,
            senharesetexpires
        });

        const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
            expiresIn: 86400,
        });

        return res.json({usuario, token});
    }
};
