const express = require("express");
const router = express.Router();

//invocar o controller
const calculadora_controller = require('../controllers/estacionamentosController');

//route soma
router.route("/soma/:a&:b").get(calculadora_controller.soma);

//route subtracao
router.route("/subtracao/:a&:b").get(calculadora_controller.subtracao);

//route multiplicacao
router.route("/multiplicacao/:a&:b").get(calculadora_controller.multiplicacao);

//route divisao
router.route("/divisao/:a&:b").get(calculadora_controller.divisao);

module.exports = router;