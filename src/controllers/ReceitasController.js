const Receitas = require("../models/Receitas");
const User = require("../models/User");
const Avaliacoes = require("../models/Avaliacoes");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: "paireceitas" },
    });

    if (!user) {
      res.status(400).send({ error: "User not found." });
    }

    //const receitas = await Receitas.findAll({ where: { user_id }});
    //console.log('')

    return res.json(user);
  },

  async listreceita(req, res) {
    const { receita_id } = req.params;

    const receita = await Receitas.findByPk(receita_id);

    if (!receita) {
      res.status(400).send({ error: "Receita não encontrada." });
    }

    return res.json(receita);
  },

  async box(req, res) {
    const receitas = await Receitas.findAll({
      attributes: ["id", "nome", "cultura"],
      include: [
        {
          association: "paiavaliacoes",
          attributes: ["avaliacao", "comentario"],
        },
        {
          association: "filhousers",
          attributes: ["nome", "user", "id"],
        },
      ],
    });
    if (!receitas) {
      res.status(400).send({ error: "Erro na receita" });
    }

    return res.json(receitas);
  },

  async minhasreceitas(req, res) {
    const { userId } = req;
    //console.log(userId)
    const user = await User.findByPk(userId, {
      include: { association: "paireceitas" },
    });

    if (!user) {
      res.status(400).send({ error: "User not found." });
    }

    //const receitas = await Receitas.findAll({ where: { user_id }});
    //console.log('')

    return res.json(user.paireceitas);
  },

  async list(req, res) {
    const receitas = await Receitas.findAll();

    return res.json(receitas);
  },

  async del(req, res) {
    const { receita_id } = req.params;
    const { userId } = req;
    const receita = await Receitas.findByPk(receita_id);

    if (!receita) {
      return res.json({ error: "Receita not found." });
    }
    if (receita.user_id != userId) {
      return res.status(400).send({ error: "You cannot delete this receita." });
    }

    await receita.destroy();

    return res.json({ message: "receita deletada." });
  },

  async updt(req, res) {
    const { receita_id } = req.params;
    const { userId } = req;
    const receita = await Receitas.findByPk(receita_id);

    if (!receita) {
      return res.status(400).send({ error: "Receita not found." });
    }
    if (receita.user_id != userId) {
      return res.status(400).send({ error: "You cannot update this receita." });
    }

    const {
      nome,
      ingredientes,
      preparo,
      maisinfos,
      categoria,
      sabor,
      cultura,
    } = req.body;

    await receita.update({
      nome,
      ingredientes,
      preparo,
      maisinfos,
      categoria,
      sabor,
      cultura,
    });

    return res.json(receita);
  },

  async store(req, res) {
    const { userId } = req;
    const {
      nome,
      ingredientes,
      preparo,
      maisinfos,
      categoria,
      sabor,
      cultura,
    } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: "User não encontrado." });
    }

    const receit = await Receitas.create({
      nome,
      ingredientes,
      preparo,
      maisinfos,
      categoria,
      sabor,
      cultura,
      user_id: userId,
    });

    return res.json(receit);
  },
};
