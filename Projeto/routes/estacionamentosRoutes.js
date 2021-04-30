const express = require("express");
const router = express.Router();

//invocar o controller
const estacionamentos_controller = require('../controllers/estacionamentosController');

//route regista matriculas
router.route("/AddMatriculas/:n").post(estacionamentos_controller.AddMatriculas);

//route subtracao
router.route("/subtracao/:a&:b").get(estacionamentos_controller.subtracao);

//route multiplicacao
router.route("/multiplicacao/:a&:b").get(estacionamentos_controller.multiplicacao);

//route divisao
router.route("/divisao/:a&:b").get(estacionamentos_controller.divisao);

module.exports = router;