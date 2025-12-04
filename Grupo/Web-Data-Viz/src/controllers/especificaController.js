var especificaModel = require("../models/especificaModel");

function detalhes(req, res){
    var Sensor = req.params.idSensor

    especificaModel.obterDetalhes(Sensor).then(function (resultado){
      res.json(resultado);

    }).catch(function (erro) {
      console.log(erro);
      console.log(
        `\nHouve um erro ao tentar coletar os dados! Erro:`,
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
    
}

function MaioPreenchimento(req, res){
    var Sensor = req.params.idSensor

    especificaModel.ObterMaioPreenchimento(Sensor).then(function (resultado){
      res.json(resultado);

    }).catch(function (erro) {
      console.log(erro);
      console.log(
        `\nHouve um erro ao tentar coletar os dados! Erro:`,
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
    
}

function horarioPicoPreenchimento(req, res){
    var Sensor = req.params.idSensor

    especificaModel.ObterhorarioPicoPreenchimento(Sensor).then(function (resultado){
      res.json(resultado);

    }).catch(function (erro) {
      console.log(erro);
      console.log(
        `\nHouve um erro ao tentar coletar os dados! Erro:`,
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
    
}

function dadosBruto(req, res){
    var Sensor = req.params.idSensor

    especificaModel.ObterdadosBruto(Sensor).then(function (resultado){
      res.json(resultado);

    }).catch(function (erro) {
      console.log(erro);
      console.log(
        `\nHouve um erro ao tentar coletar os dados! Erro:`,
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
    
}

module.exports = {
    MaioPreenchimento,
    horarioPicoPreenchimento,
    dadosBruto,
    detalhes
  
};
