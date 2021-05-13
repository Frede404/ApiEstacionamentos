const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/UserController');

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

//criar um novo user
router.route("/NovoUtilizador/:username/:password").post(verificaJWTAdmin, user_controller.newUser);

//login
router.route("/login/:username/:password").post(user_controller.login);

module.exports = router;