const Avaliacoes = require("../models/Avaliacoes");
const User = require("../models/User");
const Respostas = require("../models/Respostas");

module.exports = {
  async index(req, res) {
    const { avaliacao_id } = req.params;

    const avaliacao = await Avaliacoes.findByPk(avaliacao_id, {
      include: [
        {
          association: "pairespostas",
          include: {
            association: "filhousers",
            attributes: ["nome", "user", "id"],
          },
          attributes: ["id", "resposta"],
        },
        {
          association: "filhousers",
          attributes: ["nome", "user", "id"],
        },
      ],
      attributes: ["id", "avaliacao", "comentario"],
    });

    if (!avaliacao) {
      return res.status(400).json({ error: "Avaliacao not found." });
    }

    return res.json(avaliacao); //retorna avaliacao e respostas
    //return res.json(avaliacao.pairespostas);//retorna apenas respostas da avaliacao
  },

  async del(req, res) {
    const { resposta_id } = req.params;
    const { userId } = req;
    const resp = await Respostas.findByPk(resposta_id);

    if (!resp) {
      return res.status(400).send({ error: "Resposta não encontrada." });
    }
    if (resp.user_id !== userId) {
      return res
        .status(400)
        .send({ error: "Você não pode detelar esta resposta." });
    }

    await resp.destroy();

    return res.json({ message: "Resposta deletada." });
  },

  async updt(req, res) {
    const { resposta_id } = req.params;
    const { userId } = req;
    const resp = await Respostas.findByPk(resposta_id);

    if (!resp) {
      return res.status(400).send({ error: "Resposta not found." });
    }
    if (resp.user_id !== userId) {
      return res
        .status(400)
        .send({ error: "You cannot update this resposta." });
    }

    const { respostaEditada } = req.body;

    await resp.update({
      resposta: respostaEditada,
    });

    return res.json(resp);
  },

  async store(req, res) {
    const { avaliacao_id } = req.params;
    const { userId } = req;
    const { resposta } = req.body;

    const avaliacao = await Avaliacoes.findByPk(avaliacao_id);

    if (!avaliacao) {
      return res.status(400).json({ error: "Avaliacao not found." });
    }

    const resp = await Respostas.create({
      resposta,
      user_id: userId,
      avaliacao_id,
    });

    return res.json(resp);
  },
};
