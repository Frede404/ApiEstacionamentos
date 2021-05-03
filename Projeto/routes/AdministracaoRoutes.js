const express = require("express");
const router = express.Router();

//invocar o controller
const administracao_controller = require('../controllers/AdministracaoController');

//route popular matriculas
router.route("/PopularMatriculas/:n").post(administracao_controller.AddMatriculas);

//route Apaga matriculas
router.route("/DelMatriculas").delete(administracao_controller.DelMatriculas);

//route popular estacionamentos
router.route("/PopularEstacionamentos").post(administracao_controller.AddEstacionamentos);

//route Apaga estacionamentos
router.route("/DelEstacionamentos").delete(administracao_controller.DelEstacionamentos);
 
//route Reset ao parque
router.route("/ResetParque/:n").put(administracao_controller.ResetParque);

module.exports = router;