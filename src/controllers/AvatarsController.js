const Avatars = require("../models/Avatars");
const User = require("../models/User");

module.exports = {
    
    async upavatar (req, res) {
        const { userId } = req;
        const nome = req.file.originalname;
        const size = req.file.size;
        const key = req.file.filename;
        const url = 'avatar.com';

        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(400).json({ error: 'User not found.' })
        }

        const avat = await Avatars.create({
            nome,
            size,
            key,
            url,
            user_id: userId
        });

        return res.json(avat);
    }
}