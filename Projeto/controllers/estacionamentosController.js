exports.soma = function (req, res) {
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