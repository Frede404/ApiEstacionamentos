exports.soma1 = function (req, res) {
    const c = parseInt(req.params.a) + parseInt(req.params.b);
    //console.log('gg',req.params.a , req.params.b , c)
    res.send(c.toString());
   };

exports.subtracao = function (req, res){
    const c = parseInt(req.params.a) - parseInt(req.params.b);
	console.log(req.params.a , req.params.b , c)
    res.send(c.toString()); 
}

exports.multiplicacao = function (req, res) {
    const c = parseInt(req.params.a) * parseInt(req.params.b);
	//console.log(req.params.a , req.params.b , c)
    res.send(c.toString());
}

exports.divisao = function (req, res) {
    const c = parseInt(req.params.a) / parseInt(req.params.b);
	//console.log(req.params.a , req.params.b , c)
    res.send(c.toString());
}
var Registo = require ('../models/estacionamentosModel');
exports.soma = async function(req, res){
	
    let quantidade = req.params.a
    
    for(i=1; i<=quantidade; i++){
        let numeroa = Math.floor(Math.random() * (9)) ;
        let numerob = Math.floor(Math.random() * (9)) ;
        let numeroc = Math.floor(Math.random() * (9)) ;
        let numerod = Math.floor(Math.random() * (9)) ;
        let letraa = Math.floor(Math.random() * (91 - 65)) + 65;
        let letrab = Math.floor(Math.random() * (91 - 65)) + 65;
                
        let registo = new  Registo({
            _id: i,
            nMatricula: '' + numeroa + numerob + '-' + String.fromCharCode(letraa) + String.fromCharCode(letrab) + '-' + numeroc + numerod,
        });
        
        registo.save(function(err){
            
            if(err){
                throw err;
            }
        })
    }
    res.send('Pessoa registada sucesso!')
};