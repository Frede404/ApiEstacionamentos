const express = require("express");
const router = express.Router();

//invocar o controller
const matricula_controller = require('../controllers/estacionamentosMatriculasController');

//route regista matriculas
router.route("/AddMatriculas/:n").post(matricula_controller.AddMatriculas);

//route Apaga matriculas
router.route("/DelMatriculas").delete(matricula_controller.DelMatriculas);

module.exports = router;