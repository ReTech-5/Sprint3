var express = require("express");
var router = express.Router();

var geralController = require("../controllers/geralController");

router.get("/dadosDashboardOrganica", function (req, res) {
    geralController.dadosDashboardOrganica(req, res)
});

router.get("/dadosDashboardReciclavel", function (req, res) {
    geralController.dadosDashboardReciclavel(req, res)
});

router.get("/listarEndereco/:Empresa", function(req, res) {
    geralController.listarEndereco(req, res)
});

router.get("/sensoresAtivos", function (req, res) {
    geralController.sensoresAtivos(req, res)
});

router.get("/sensoresInativos", function (req, res) {
    geralController.sensoresInativos(req, res)
});

module.exports = router;