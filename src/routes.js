const express = require("express");
const UserController = require("./controllers/UserController");
const ReceitasController = require("./controllers/ReceitasController");
const AvaliacoesController = require("./controllers/AvaliacoesController");
const RespostasController = require("./controllers/RespostasController");
const LoginController = require("./controllers/LoginController");
const authMiddleware = require("./middlewares/auth");
const AvatarsController = require("./controllers/AvatarsController");
const multer = require("multer");
const multerConfig = require("./config/multer");
const FotosController = require("./controllers/FotosController");

const routes = express.Router();

routes.post("/users/create", UserController.store); //criar usuario//verify
routes.post("/authenticate", LoginController.auth); //logar//verify
routes.post("/forgotpassword", LoginController.forgotpass); //esqueci a senha//verify
routes.post("/resetpassword", LoginController.resetpass); //reset senha//verify
routes.get("/users", UserController.index); //listar usuarios//verify
routes.get("/users/receitas", ReceitasController.list); //listar todas as receitas//verify

routes.use(authMiddleware);

routes.get("/sessaologada", LoginController.proj); //atenticação com token//verify

routes.delete("/users/delete", UserController.del); //deletar usuario//verify
routes.put("/users/update", UserController.updt); //alterar dados usuario//verify
routes.put("/users/updatesenha", UserController.updtsenha); //alterar senha//verify
routes.get("/users/me", UserController.me); //meu perfil//verify

routes.post("/users/receitas/create", ReceitasController.store); //criar receita//verify
routes.get("/users/receitas/user/:user_id", ReceitasController.index); //listar receita de usuario unico//verify
routes.get("/users/receitas/id/:receita_id", ReceitasController.listreceita); //listar receita unica//verify
routes.get("/users-receitas-minhasreceitas", ReceitasController.minhasreceitas); //listar minhas receitas//verify
routes.delete("/users/receita/delete/:receita_id", ReceitasController.del); //deletar receita propria//verify
routes.put("/users/receitas/update/:receita_id", ReceitasController.updt); //alterar receita propria//verify
routes.get("/users/receitas-box", ReceitasController.box); //box//verify

routes.post(
  "/users/receitas/avaliacoes/create/:receita_id",
  AvaliacoesController.store
); //criar avaliação pra receita//verify
routes.get(
  "/users/receitas/avaliacoes/:receita_id",
  AvaliacoesController.index
); //listar todas as avaliações de uma receita//verify
routes.get("/users-receitas-avaliacoes", AvaliacoesController.list); //listar todas as avaliações existentes//verify
routes.delete(
  "/users/receitas/avaliacoes/delete/:avaliacao_id",
  AvaliacoesController.del
); //deletar avaliacao//verify
routes.put(
  "/users/receitas/avaliacoes/update/:avaliacao_id",
  AvaliacoesController.updt
); //alterar avaliacao//verify

routes.post(
  "/users/receitas/avaliacoes/respostas/create/:avaliacao_id",
  RespostasController.store
); //criar resposta para avaliação//verify
routes.get(
  "/users/receitas/avaliacoes/respostas/:avaliacao_id",
  RespostasController.index
); //listar todas as respostas de uma avaliação//verify
routes.delete(
  "/users/receitas/avaliacoes/respostas/delete/:resposta_id",
  RespostasController.del
); //deletar resposta//verify
routes.put(
  "/users/receitas/avaliacoes/respostas/update/:resposta_id",
  RespostasController.updt
); //alterar resposta//verify

routes.post(
  "/users/upavatar",
  multer(multerConfig).single("avatar"),
  AvatarsController.upavatar
); //alterar foto de perfil
routes.post(
  "/users/receitas/upfoto/:receita_id",
  multer(multerConfig).single("foto"),
  FotosController.upfoto
); //alterar foto da receita

//oq ainda falta:
//- solicitar senha ao alterar cadasto, receita, avaliação ou resposta
//- implementar bio
//- implementar upload de arquivos (imagens)

module.exports = routes;
