const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => { 
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ error: 'Nenhum token foi fornecido.' });
    }

    const parts = authHeader.split(' ');
    if(!parts.length == 2){
        return res.status(401).send({ error: 'Erro no Token.' });
    }

    const [scheme, token ] = parts;
    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error: 'Token mal formatado.' });
    }

    /* console.log(req.headers.authorization)
    req.headers.authorization =  jwt.sign({ id: req.userId }, authConfig.secret, {
        expiresIn: 86400,//token expira em 1 dia
    });
    console.log(req.headers.authorization) */

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token inválido.' });

        req.userId = decoded.id;
        console.log(req.userId)
        return next();
    })
 };