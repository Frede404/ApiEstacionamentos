const express = require("express");
const router = express.Router();

//invocar o controller
const parque_controller = require('../controllers/ParqueController');

//route Lugares Vagos
router.route("/LugaresVagos").get(parque_controller.LugaresVagos);

//route Registo de entrada de um carro
router.route("/RegistaEntrada/:matricula").put(parque_controller.RegistaEntrada);

//route Registo de saida de um carro
router.route("/RegistaSaida").put(parque_controller.RegistaSaida);

//route media
router.route("/MediaCarros/:periodo").get(parque_controller.MediaCarros);

//route quantos carros entraram num certo dia
router.route("/QtdCarrosNumaData/:data").get(parque_controller.QtdDia);

//route quantos carros nao registados entraram num certo dia 
router.route("/QtdCarrosNRegistadosNumaData/:data").get(parque_controller.QtdNRegistados);

//route MaisCarros
router.route("/DiaComMaisCarros").get(parque_controller.MaiorDia);

//route MenosCarros
router.route("/DiaComMenosCarros").get(parque_controller.MenorDia);

//route entradas do Carro num dia
router.route("/EntradasCarroNumaData/:matricula/:data").get(parque_controller.QtdDiaCarro);

//route numero de carros num periudo
router.route("/CarrosEntreDatas/:DataInicio/:DataFim").get(parque_controller.QtdPeriodo);

//route Registo de saida de um carro
router.route("/DiasLotado").get(parque_controller.DiasLotado);

module.exports = router;