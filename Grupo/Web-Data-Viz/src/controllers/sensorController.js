var sensorModel = require("../models/sensorModel");

function listarEnderecos(req, res) {
  sensorModel.listarEnderecos()
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
      console.log("Erro ao listar endereços:", erro);
      res.status(500).json(erro);
    });
}

function listarTodos(req, res) {
  sensorModel.listarTodos()
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
      console.log("Erro ao listar sensores:", erro);
      res.status(500).json(erro);
    });
}

function listarPorLixeira(req, res) {
  var codigoLixeira = req.params.codigoLixeira;

  sensorModel.listarPorLixeira(codigoLixeira)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
      console.log("Erro ao listar lixeira específica:", erro);
      res.status(500).json(erro);
    });
}

function exibirInativos(req, res) {
  var fkEmpresa = req.query.fkEmpresa;

  sensorModel.exibirInativos(fkEmpresa)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
      console.log("Erro ao exibir inativos:", erro);
      res.status(500).json(erro);
    });
}

function exibirCriticos(req, res) {
  var fkEmpresa = req.query.fkEmpresa;

  sensorModel.exibirCriticos(fkEmpresa)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
      console.log("Erro ao exibir críticos:", erro);
      res.status(500).json(erro);
    });
}

module.exports = {
  listarEnderecos,
  listarTodos,
  listarPorLixeira,
  exibirInativos,
  exibirCriticos,
};
