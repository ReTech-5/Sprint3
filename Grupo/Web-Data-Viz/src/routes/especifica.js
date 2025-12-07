var express = require("express");
var router = express.Router();

var especificaController = require("../controllers/especificaController");

router.get("/listarSensores/:idEndereco", function (req, res) {
    especificaController.listarSensores(req, res)

});

router.get("/detalhes/:idSensor", function (req, res) {
    especificaController.detalhes(req, res)

});

router.get("/MaioPreenchimento/:idSensor", function (req, res) {
    especificaController.MaioPreenchimento(req, res)

});

router.get("/horarioPicoPreenchimento/:idSensor", function (req, res) {
    especificaController.horarioPicoPreenchimento(req, res)

});

router.get("/dadosBruto/:idSensor", function (req, res) {
    especificaController.dadosBruto(req, res)

});

module.exports = router;


