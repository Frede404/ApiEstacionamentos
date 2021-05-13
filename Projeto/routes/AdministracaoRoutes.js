const express = require("express");
const router = express.Router();

//invocar o controller
const administracao_controller = require('../controllers/AdministracaoController');

//JWT (para gerar e verificar tokens)
const jwt = require('jsonwebtoken');
//importar o secret para o JWT do ficheiro Secret.json
const Secret= require('../Secret.json');
const SECRET_ADMINISTRADOR=Secret.SECRET_ADMINISTRADOR;

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

//route popular matriculas
router.route("/PopularMatriculas/:n").post(verificaJWTAdmin, administracao_controller.AddMatriculas);

//route Apaga matriculas
router.route("/DelMatriculas").delete(verificaJWTAdmin, administracao_controller.DelMatriculas);

//route popular estacionamentos
router.route("/PopularEstacionamentos").post(verificaJWTAdmin, administracao_controller.AddEstacionamentos);

//route Apaga estacionamentos
router.route("/DelEstacionamentos").delete(verificaJWTAdmin, administracao_controller.DelEstacionamentos);

//route popular matriculas
router.route("/RegistaMatricula/:matricula").post(verificaJWTAdmin, administracao_controller.AddMatricula);
 
//route Reset ao parque
router.route("/ResetParque/:n").put(verificaJWTAdmin, administracao_controller.ResetParque);

module.exports = router;