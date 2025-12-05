var express = require("express");
var router = express.Router();

var geralController = require("../controllers/geralController");

router.get("/dadosDashboardOrganica", function (req, res) {
    geralController.dadosDashboardOrganica(req, res)
});

router.get("/dadosDashboardReciclavel", function (req, res) {
    geralController.dadosDashboardReciclavel(req, res)
});

module.exports = router;