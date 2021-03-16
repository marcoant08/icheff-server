const Avaliacoes = require("../models/Avaliacoes");
const User = require("../models/User");
const Receitas = require("../models/Receitas");

module.exports = {
  async index(req, res) {
    const { receita_id } = req.params;

    const receita = await Receitas.findByPk(receita_id, {
      include: [
        {
          association: "paiavaliacoes",
          include: [
            {
              association: "filhousers",
              attributes: ["nome", "user", "id"],
            },
            {
              association: "pairespostas",
              attributes: ["id"],
            },
          ],
          attributes: ["id", "comentario", "avaliacao"],
        },
      ],
    });

    if (!receita) {
      return res.status(400).json({ error: "Receita not found." });
    }

    return res.json(receita.paiavaliacoes); //retorna receita e avaliacoes
    //return res.json(receita.paiavaliacoes);//retorna apenas avaliacoes da receita
  },

  async list(req, res) {
    const avali = await Avaliacoes.findAll();

    if (!avali) {
      return res.status(400).json({ error: "Avaliacoes not found." });
    }

    return res.json(avali);
  },

  async del(req, res) {
    const { avaliacao_id } = req.params;
    const { userId } = req;
    const avaliacao = await Avaliacoes.findByPk(avaliacao_id);

    if (!avaliacao) {
      return res.status(400).send({ error: "Avaliacao não encontrada." });
    }
    if (avaliacao.user_id !== userId) {
      return res
        .status(400)
        .send({ error: "Você não pode deletar esta avaliação." });
    }

    await avaliacao.destroy();

    return res.json({ message: "Avaliação deletada." });
  },

  async updt(req, res) {
    const { avaliacao_id } = req.params;
    const { userId } = req;
    const avali = await Avaliacoes.findByPk(avaliacao_id);

    if (!avali) {
      return res.status(400).send({ error: "Avaliação não encontrada." });
    }
    if (avali.user_id !== userId) {
      return res
        .status(400)
        .send({ error: "Você não pode alterar essa avaliação." });
    }

    const { comentarioEditado, avaliacaoEditada } = req.body;

    await avali.update({
      comentario: comentarioEditado,
      avaliacao: avaliacaoEditada,
    });

    return res.json(avali);
  },

  async store(req, res) {
    const { receita_id } = req.params;
    const { userId } = req;

    const { comentario, avaliacao } = req.body;

    const receita = await Receitas.findByPk(receita_id);

    if (!receita) {
      return res.status(400).json({ error: "Receita not found." });
    }

    const avali = await Avaliacoes.create({
      comentario,
      avaliacao,
      user_id: userId,
      receita_id,
    });

    return res.json(avali);
  },
};
