var sensorModel = require("../models/sensorModel");

// (OPCIONAL / LEGADO) – essas funções só vão funcionar se você criar
// os métodos correspondentes no model. Como não são usadas nas rotas
// que você me mostrou, vou deixar aqui, mas o foco são as novas.
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

/*  NOVAS FUNÇÕES USADAS NA DASHBOARD / ROTAS  */

// Lista sensores + endereço (dashboard geral)
function listarEnderecos(req, res) {
  sensorModel
    .listarEnderecos()
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum endereço de sensor encontrado");
      }
    })
    .catch((erro) => {
      console.error("Erro ao listar endereços:", erro.sqlMessage || erro);
      res.status(500).json(erro.sqlMessage || erro);
    });
}

// Lista todos os sensores (sem join de endereço)
function listarTodos(req, res) {
  sensorModel
    .listarTodos()
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum sensor encontrado");
      }
    })
    .catch((erro) => {
      console.error("Erro ao listar sensores:", erro.sqlMessage || erro);
      res.status(500).json(erro.sqlMessage || erro);
    });
}

// Lista dados de uma lixeira específica
function listarPorLixeira(req, res) {
  var codigoLixeira = req.params.codigoLixeira;

  sensorModel
    .listarPorLixeira(codigoLixeira)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res
          .status(204)
          .send(`Nenhum sensor encontrado para a lixeira ${codigoLixeira}`);
      }
    })
    .catch((erro) => {
      console.error("Erro ao listar por lixeira:", erro.sqlMessage || erro);
      res.status(500).json(erro.sqlMessage || erro);
    });
}

/* ALERTAS (JÁ ESTAVAM CERTOS) */

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
  // legado
  listar,
  listarPorEmpresa,
  listarPorStatus,
  listarPorCategoria,

  // usadas pela dashboard/rotas
  listarEnderecos,
  listarTodos,
  listarPorLixeira,
  exibirInativos,
  exibirCriticos,
};
