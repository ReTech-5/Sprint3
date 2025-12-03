var lixeiraModel = require("../models/lixeiraModel");

function listar(req, res) {
   // (Código do listar que já fizemos...)
   lixeiraModel.listar().then((resultado) => {
       if (resultado.length > 0) res.status(200).json(resultado);
       else res.status(204).send("Nenhum resultado!");
   }).catch((erro) => res.status(500).json(erro.sqlMessage));
}

function buscarPorId(req, res) {
    var idSensor = req.params.idSensor;

    lixeiraModel.buscarPorId(idSensor)
        .then((resultado) => {
            if (resultado.length > 0) res.status(200).json(resultado);
            else res.status(204).send("Nenhum resultado!");
        }).catch((erro) => res.status(500).json(erro.sqlMessage));
}

function buscarMedidas(req, res) {
    var idSensor = req.params.idSensor;

    lixeiraModel.buscarMedidas(idSensor)
        .then((resultado) => {
            if (resultado.length > 0) res.status(200).json(resultado);
            else res.status(204).send("Nenhum resultado!");
        }).catch((erro) => res.status(500).json(erro.sqlMessage));
}

module.exports = {
    listar,
    buscarPorId,
    buscarMedidas
}