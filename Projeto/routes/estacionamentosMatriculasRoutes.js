const express = require("express");
const router = express.Router();

//invocar o controller
const matricula_controller = require('../controllers/estacionamentosMatriculasController');

//route regista matriculas
router.route("/AddMatriculas/:n").post(matricula_controller.AddMatriculas);

//route regista matriculas
router.route("/DelMatriculas").delete(matricula_controller.DelMatriculas);

//route subtracao
router.route("/subtracao/:a&:b").get(matricula_controller.subtracao);

//route multiplicacao
router.route("/multiplicacao/:a&:b").get(matricula_controller.multiplicacao);

//route divisao
router.route("/divisao/:a&:b").get(matricula_controller.divisao);

module.exports = router;