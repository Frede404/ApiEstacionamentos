const express = require("express");
const router = express.Router();

//invocar o controller
const parque_controller = require('../controllers/estacionamentosParqueController');
const parques_controller = require('../controllers/estacionamentosParqueControllercopy');

//route media
router.route("/Media/:periodo").get(parque_controller.MediaCarros);

//route MaisCarros
//router.route("/DiaMaisCarros").get(parque_controller.MaiorDia);


//route MenosCarros
//router.route("/MenorDia").get(parques_controller.MenorDia);

//route entradas do Carro num dia
//router.route("/EntradasCarro/:matricula&:dia").get(parque_controller.QtdDiaCarro);

//route numero de carros num periudo
//router.route("/CarrosPeriodo/:DataInicio&:DataFim").get(parque_controller.QtdPeriodo);

//route Registo de saida de um carro
//router.route("/RegistaSaida").put(parque_controller.RegistaSaida);

//route Lugares Vagos
//router.route("/LugaresVagos").get(parque_controller.LugaresVagos);


//route Reset ao parque
router.route("/ResetParque/:n").put(parque_controller.ResetParque);

//route quantos carros entraram num certo dia
//router.route("/QtdDia/:data").get(parques_controller.QtdDia);

//route quantos carros nao registados entraram num certo dia 
//router.route("/QtsNRegistado/:data").get(parques_controller.QtsNRegistado);

//route Registo de saida de um carro
//router.route("/RegistaEntrada/:matricula").put(parques_controller.RegistaEntrada);
router.route("/RegistaEntrada/:matricula&:datatestes").put(parques_controller.RegistaEntrada);//aqui apagar

//route Registo de saida de um carro
//router.route("/DiasLotado").post(parques_controller.DiasLotado);

module.exports = router;