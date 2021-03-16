const User = require("../models/User");
const Fotos = require("../models/Fotos");

module.exports = {
    
    async upfoto (req, res) {
        const { userId } = req;
        const { receita_id } = req.params;
        const nome = req.file.originalname;
        const size = req.file.size;
        const key = req.file.filename;
        const url = 'foto.com';

        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(400).json({ error: 'User not found.' })
        }

        const fots = await Fotos.create({
            nome,
            size,
            key,
            url,
            user_id: userId,
            receita_id,
        });

        return res.json(fots);
    }
}