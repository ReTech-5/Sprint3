var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

// Dashboard geral
router.get("/listarEnderecos", function(req, res){
    sensorController.listarEnderecos(req, res);
});

// Lista todos os sensores
router.get("/listar", function(req, res){
    sensorController.listarTodos(req, res);
});

// Dashboard específica da lixeira
router.get("/listar/lixeira/:codigoLixeira", function(req, res){
    sensorController.listarPorLixeira(req, res);
});

// Alertas Inativos
router.get("/exibirInativos", function(req, res){
    sensorController.exibirInativos(req, res);
});

// Alertas Críticos
router.get("/exibirCriticos", function(req, res){
    sensorController.exibirCriticos(req, res);
});

module.exports = router;
