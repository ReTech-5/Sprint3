var express = require("express");
var router = express.Router();

var bobIAController = require("../controllers/bobIAController");

router.post("/perguntar", function (req, res) {
    bobIAController.perguntar(req, res)
});

module.exports = router;