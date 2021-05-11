var User = require('../models/UserModel');

//JWT (para gerar e verificar tokens)
const jwt = require('jsonwebtoken');
//importar o secret para o JWT do ficheiro Secret.json
const Secret= require('../Secret.json');

const SECRET_UTILIZADORES = Secret.SECRET_UTILIZADORES;
const SECRET_ADMINISTRADOR = Secret.SECRET_ADMINISTRADOR;

//criar um novo utilizador
exports.newUser = function(req, res){
    User.countDocuments({username: req.params.username}, function(err, contador){
        if(contador == 0){
            User.findOne().sort('-_id').exec(function(err, userID){
                let aux = 1;
                let aux_role="utilizador"
                if(userID != null){
                    aux = parseInt(''+ userID.id, 10);
                    aux = aux + 1;
                    aux_role="utilizador"
                }
                else{
                    aux_role="administrador"
                }
                let user = new User({
                    _id: aux,
                    username: req.params.username,
                    password: req.params.password,
                    role: aux_role
                });
                user.save(function(err){
                    if(err){
                        throw err;
                    }
                    //console.log('user criado com sucesso.');
                    res.send('User inserido com sucesso!');
                })
            })
        }else{
        //console.log('esse username já existe!');
        res.send('Esse username já existe!');
        }
    })
};

//fazer login na API
exports.login = function(req, res) {
    let userName = req.params.username;
    let pass = req.params.password;

    User.countDocuments({username: userName, password: pass}, function(err, contagem){
        if(contagem != 0){
            User.findOne({username: userName, password: pass}, function(err, utilizador){
                if(userName == utilizador.username && pass == utilizador.password){
                    let idUsers = utilizador.id;
                    let aux_role = utilizador.role;

                    //jwt.sign({payload(info para saber qual é o usuario)}, process.env.Assinatura digital,{opcoes "tempo expiracao"})
                    let token = jwt.sign({idUser: idUsers}, SECRET_UTILIZADORES,{
                        expiresIn: 300
                    });
                    if(aux_role=='administrador'){
                        token = jwt.sign({idUser: idUsers}, SECRET_ADMINISTRADOR,{
                            expiresIn: 300
                        });
                    }

                    return res.json({Login: "valido", token: token});
                }
            })
        }else{
            res.status(500).json({message: 'Login inválido!'});
        }
    })
};