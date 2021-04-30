var Lugares = require ('../models/estacionamentosLugaresModel');
var estacionamentosRegistoEntradasModel = require('../models/estacionamentosRegistoEntradasModel');

exports.ResetParque = async function(req, res){
    let quantidade = req.params.n

    Lugares.findById(1, function (err, registo) {
        registo.qtd= quantidade
        
        //reset
        registo.save(function(err){
            
            if(err){
                throw err;
            }
        })

        res.send('Matriculas registadas sucesso!')
    })
}

exports.MediaCarros = async function(req, res){
	let diaMillis = 86400000;
    let mesMillis = 262974383000000000;

    let periodo = req.params.periodo;
    let primeiroRegisto = RegistoEntradas.findOne().sort('_id');
    let ultimoRegisto = RegistoEntradas.findOne().sort('-_id');
    let primeiraData = primeiroRegisto.dataEntrada;
    let ultimaData = ultimoRegisto.dataEntrada;
    
    

    let difDias = Math.abs(ultimaData.getTime()) - primeiraData.getTime();
    difDias = difDias/diaMillis;

    

    let dia = "";

    if(req.params.periodo == "dia"){
        
        let difDias = Math.abs(ultimaData.getTime()) - primeiraData.getTime();
        difDias = difDias/diaMillis;

        console.log(difDias);

    }else if(req.params.periodo == "mes"){
        let difMes = Math.abs(ultimaData.getTime()) - primeiraData.getTime();
        difMes = difMes/mesMillis;
        
        console.log(difMes);
        
    }else if(req.params.periodo == "ano"){

    }

    //res.send(dia)
};

exports.RegistaEntrada = async function(req, res){
    //Data do sistema
		let timeStamp = Date.now();
		let dataTime = new Date(timeStamp);
		let dia = dataTime.getDate();
		let mes = dataTime.getMonth()+1;
		let ano = dataTime.getFullYear();
		let horas = dataTime.getHours();
		let minutos = dataTime.getMinutes();
		let segundos = dataTime.getSeconds();
		//Data formatada
		let dataHistorico = dia + '/' + mes + '/' + ano + ' h:'
		+ horas + ':' + minutos + ':' + segundos;
    
    res.send('Matriculas registadas sucesso!')
}