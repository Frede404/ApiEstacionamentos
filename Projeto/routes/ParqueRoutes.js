const express = require("express");
const router = express.Router();

//JWT (para gerar e verificar tokens)
const jwt = require('jsonwebtoken');
//importar o secret para o JWT do ficheiro Secret.json
const Secret= require('../Secret.json');
const SECRET_UTILIZADORES=Secret.SECRET_UTILIZADORES;
const SECRET_ADMINISTRADOR=Secret.SECRET_ADMINISTRADOR;

//invocar o controller
const parque_controller = require('../controllers/ParqueController');

//verifica previlégios administrados
function verificaJWTAdmin(req, res, next){
    const token = req.headers['api_key'];
    jwt.verify(token, SECRET_ADMINISTRADOR, (err) => {
        
        if(err){
            return res.status(401).send('Unautorized access!');
        }
        next();
    })
}
//verifica previlégios todos os users registados
function verificaJWTTodos(req, res, next){
    let token = req.headers['api_key'];
    jwt.verify(token, SECRET_ADMINISTRADOR, (err) => {
        
        if(err){
            jwt.verify(token, SECRET_UTILIZADORES, (err) => {
        
                if(err){
                    return res.status(401).send('Unautorized access!');
                }
                next();
            })
            //return res.status(401).send('Unautorized access!');
        }else{
            next();
        }
    })
}

//route Lugares Vagos todos os utilizadores
router.route("/LugaresVagos").get(verificaJWTTodos, parque_controller.LugaresVagos);

//route Registo de entrada de um carro admin
router.route("/RegistaEntrada/:matricula").put(verificaJWTAdmin, parque_controller.RegistaEntrada);

//route Registo de saida de um carro admin
router.route("/RegistaSaida").put(verificaJWTAdmin, parque_controller.RegistaSaida);

//route media admin
router.route("/MediaCarros/:periodo").get(verificaJWTAdmin, parque_controller.MediaCarros);

//route quantos carros entraram num certo dia admin
router.route("/QtdCarrosNumaData/:data").get(verificaJWTAdmin, parque_controller.QtdDia);

//route quantos carros nao registados entraram num certo dia admin
router.route("/QtdCarrosNRegistadosNumaData/:data").get(verificaJWTAdmin, parque_controller.QtdNRegistados);

//route MaisCarros admin
router.route("/DiaComMaisCarros").get(verificaJWTAdmin, parque_controller.MaiorDia);

//route MenosCarros admin
router.route("/DiaComMenosCarros").get(verificaJWTAdmin, parque_controller.MenorDia);

//route entradas do Carro num dia admin
router.route("/EntradasCarroNumaData/:matricula/:data").get(verificaJWTAdmin, parque_controller.QtdDiaCarro);

//route numero de carros num periudo admin
router.route("/CarrosEntreDatas/:DataInicio/:DataFim").get(verificaJWTAdmin, parque_controller.QtdPeriodo);

//route Registo de saida de um carro admin
router.route("/DiasLotado").get(verificaJWTAdmin, parque_controller.DiasLotado);

module.exports = router;