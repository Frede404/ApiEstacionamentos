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

var Registo = require ('../models/estacionamentosMatriculasModel');
exports.AddMatriculas = async function(req, res){
	
    let quantidade = req.params.n

    for(i=1; i<=quantidade; i++){
        //gera a matricula caracter a caracter aleatoriamente
        let numeroa = Math.floor(Math.random() * (9)) ;
        let numerob = Math.floor(Math.random() * (9)) ;
        let numeroc = Math.floor(Math.random() * (9)) ;
        let numerod = Math.floor(Math.random() * (9)) ;
        let letraa = Math.floor(Math.random() * (91 - 65)) + 65;
        let letrab = Math.floor(Math.random() * (91 - 65)) + 65;
        
        /* -------------------- possivel melhoria: nao introduzir matriculas iguais 
        (procura matricula a inserir se existir voltar a gerar)*/

        //formata a matricula para ser inserida
        let registo = new  Registo({
            _id: i,
            nMatricula: '' + numeroa + numerob + '-' + String.fromCharCode(letraa) +
             String.fromCharCode(letrab) + '-' + numeroc + numerod,
        });
        
        //insere a matricula
        registo.save(function(err){
            
            if(err){
                throw err;
            }
        })
    }

    res.send('Matriculas registadas sucesso!')
};
