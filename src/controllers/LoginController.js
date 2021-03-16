const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const mailer = require('../modules/mailer');

module.exports = {
    async auth (req, res) {
        const {  
            email,
            senha
        } = req.body;

        const usuario = (await User.findOne({ where: { email } }));

        if(!usuario){
            return res.status(400).send({error: 'E-mail não registrado.'});
        }

        if(!await bcrypt.compare(senha, usuario.senha)){
            return res.status(400).send({error: 'Senha incorreta.'});
        }

        //usuario.senha = undefined;

        const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
            expiresIn: 86400,
        });
        //console.log(usuario, token)
        return res.json({usuario, token});
    },

    async resetpass(req, res){
        const { email, token, senha } = req.body;

        try {
            const usuario = await User.findOne({ where: { email } })

            if(!usuario){
                return res.status(400).send({error: 'User not found.'});
            }

            if(token !== usuario.senharesettoken){
                return res.status(400).send({error: 'Token invalid.'});
            }

            const now = new Date();
            if(now > usuario.senharesetexpires){
                return res.status(400).send({error: 'Token expired, generate a new one.'});
            }
            const salt = bcrypt.genSaltSync();
            
            await usuario.update({
                senha: bcrypt.hashSync(senha, salt)
            })

            return res.send();

        } catch (err) {
            return res.status(400).send({error: "Cannot reset password, try again."})
        }
    },

    async proj (req, res) {
        return res.send({ok: true, user: req.userId});
    },

    async forgotpass (req, res) {
        const { email } = req.body;

        try {
            const usuario = await User.findOne({ where: { email } })

            if(!usuario){
                return res.status(400).send({error: 'User not found.'});
            }

            const senharesettoken = crypto.randomBytes(20).toString('hex');

            const senharesetexpires = new Date();
            senharesetexpires.setHours(senharesetexpires.getHours() + 1);

            await usuario.update({
                senharesettoken,
                senharesetexpires
            })

            /* console.log(email);
            return res.json(usuario) */

            mailer.sendMail({
                to: email,
                from: 'icheff@icheff.com',
                html: `<p>Você solicitou uma alteração de senha. Para dar continuidade ao procedimento utilize esse token: ${senharesettoken}</p>`,
                attachments: { senharesettoken },
                /* from: 'sender@example.com',
                to: email,
                subject: 'Message',
                text: 'I hope this message gets delivered!' */
            }, (err) => {
                if(err) {
                    return res.status(400).send({error: 'Cannot send forgot password.'});
                }

                return res.send();
            })

        } catch (err) {
            console.log("o erro é esse: ", err);
            return res.status(400).send({error: 'Error on forgot password, try again.'});
        }
    }
}