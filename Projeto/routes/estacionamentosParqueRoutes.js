const express = require("express");
const router = express.Router();

//invocar o controller
const parque_controller = require('../controllers/estacionamentosRegistoEntradasController');

//route media
router.route("/Media/:periodo").post(parque_controller.MediaCarros);

//route MaisCarros
router.route("/DiaMaisCarros").post(parque_controller.MaiorDia);

//route entradas do Carro num dia
router.route("/EntradasCarro/:matricula&:dia").post(parque_controller.QtdDiaCarro);

//route numero de carros num periudo
router.route("/CarrosPeriodo/:DataInicio&:DataFim").post(parque_controller.QtdPeriodo);

//route Registo de saida de um carro
router.route("/RegistaSaida").post(parque_controller.RegistaSaida);

//route Lugares Vagos
router.route("/LugaresVagos").post(parque_controller.LugaresVagos);

module.exports = router;