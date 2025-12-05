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

module.exports = {
  dadosDashboardOrganica,
  dadosDashboardReciclavel,
};