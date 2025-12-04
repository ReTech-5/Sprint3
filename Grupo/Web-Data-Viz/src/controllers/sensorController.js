var sensorModel = require("../models/sensorModel");

function listar(req, res) {
  sensorModel
    .listar()
    .then(function (resultado) {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log("Erro ao listar sensores:", erro);
      res.status(500).json(erro);
    });
}

function listarPorEmpresa(req, res) {
  var idEmpresa = req.params.idEmpresa;

  sensorModel
    .listarPorEmpresa(idEmpresa)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro);
    });
}

function listarPorStatus(req, res) {
  var status = req.params.status;

  sensorModel
    .listarPorStatus(status)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro);
    });
}

function listarPorCategoria(req, res) {
  var categoria = req.params.categoria;

  sensorModel
    .listarPorCategoria(categoria)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro);
    });
}

function exibirInativos(req, res) {

  const fkEmpresa = req.query.fkEmpresa;

  sensorModel
    .exibirInativos(fkEmpresa)
    .then((resultado) => {
      res.status(200).json(resultado);
      console.log("DADOS DO MODEL RECEBIDOS NO CONTROLLER:", resultado);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: erro.message });
    });
}

function exibirCriticos(req, res) {

  const fkEmpresa = req.query.fkEmpresa;

  sensorModel
    .exibirCriticos(fkEmpresa)
    .then((resultado) => {
      res.status(200).json(resultado);
      console.log("DADOS DO MODEL RECEBIDOS NO CONTROLLER:", resultado);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: erro.message });
    });
}

module.exports = {
  listar,
  listarPorEmpresa,
  listarPorStatus,
  listarPorCategoria,
  exibirInativos,
  exibirCriticos,
};
