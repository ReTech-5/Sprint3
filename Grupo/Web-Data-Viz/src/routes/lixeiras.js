var express = require("express");
var router = express.Router();
var lixeiraController = require("../controllers/lixeiraController");

router.get("/listar", function (req, res) {
    lixeiraController.listar(req, res);
});

// Rota para pegar dados de UM sensor (ex: /lixeiras/1)
router.get("/:idSensor", function (req, res) {
    lixeiraController.buscarPorId(req, res);
});

// Rota para pegar medidas (KPIs/Gráficos) de UM sensor
router.get("/medidas/:idSensor", function (req, res) {
    lixeiraController.buscarMedidas(req, res);
});

module.exports = router;