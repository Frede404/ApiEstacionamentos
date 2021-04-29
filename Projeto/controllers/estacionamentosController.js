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
exports.soma = function(req, res){
	
	let registo = new  Registo({
        _id: req.params.a,
		nome: req.params.a,
        email: req.params.b,
		
	});
	
	registo.save(function(err){
		
		if(err){
			throw err;
		}
		res.send('Pessoa registada sucesso!')
	})
};