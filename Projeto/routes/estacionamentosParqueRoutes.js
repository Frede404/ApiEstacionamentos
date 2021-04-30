const express = require("express");
const router = express.Router();

//invocar o controller
const parque_controller = require('../controllers/estacionamentosParqueController');

//route media
router.route("/Media/:periodo").get(parque_controller.MediaCarros);

//route MaisCarros
/*router.route("/DiaMaisCarros").get(parque_controller.MaiorDia);

//route entradas do Carro num dia
router.route("/EntradasCarro/:matricula&:dia").get(parque_controller.QtdDiaCarro);

//route numero de carros num periudo
router.route("/CarrosPeriodo/:DataInicio&:DataFim").get(parque_controller.QtdPeriodo);

//route Registo de saida de um carro
router.route("/RegistaSaida").put(parque_controller.RegistaSaida);

//route Lugares Vagos
router.route("/LugaresVagos").get(parque_controller.LugaresVagos);
*/

//route Reset ao parque
router.route("/ResetParque/:n").put(parque_controller.ResetParque);

//route Registo de saida de um carro
router.route("/RegistaEntrada/:matricula").post(parque_controller.RegistaEntrada);

module.exports = router;