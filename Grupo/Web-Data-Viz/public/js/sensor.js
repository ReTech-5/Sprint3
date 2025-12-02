var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.get("/listar", function (req, res) {
    sensorController.listar(req, res);
});

router.get("/listarPorEmpresa/:idEmpresa", function (req, res) {
    sensorController.listarPorEmpresa(req, res);
});

router.get("/listarPorStatus/:status", function (req, res) {
    sensorController.listarPorStatus(req, res);
});

router.get("/listarPorCategoria/:categoria", function (req, res) {
    sensorController.listarPorCategoria(req, res);
});

module.exports = router;
