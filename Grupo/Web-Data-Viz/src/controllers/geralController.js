var geralModel = require("../models/geralModel");

function dadosDashboardOrganica(req, res) {
  const fkEmpresa = req.query.fkEmpresa;
  console.log("FK RECEBIDO NO CONTROLLER:", fkEmpresa);

  geralModel
    .exibirOrganico(fkEmpresa)
    .then((resultado) => {
      res.status(200).json(resultado);
      console.log("DADOS DO MODEL RECEBIDOS NO CONTROLLER:", resultado);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: erro.message });
    });
}

function dadosDashboardReciclavel(req, res) {
  const fkEmpresa = req.query.fkEmpresa;
  console.log("FK RECEBIDO NO CONTROLLER:", fkEmpresa);

  geralModel
    .exibirReciclavel(fkEmpresa)
    .then((resultado) => {
      res.status(200).json(resultado);
      console.log("DADOS DO MODEL RECEBIDOS NO CONTROLLER:", resultado);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: erro.message });
    });
}

function listarEndereco (req, res){

  var idEmpresa = req.params.Empresa
  
    geralModel.obterEndereco(idEmpresa).then(function (resultado){
      res.json(resultado);
  
    }).catch(function (erro) {
      console.log(erro);
      console.log(
        `\nHouve um erro ao tentar coletar os sensores! Erro:`,
        erro.sqlMessage        
      );

      res.status(500).json(erro.sqlMessage);

    });


}

module.exports = {
  dadosDashboardOrganica,
  dadosDashboardReciclavel,
  listarEndereco,
};