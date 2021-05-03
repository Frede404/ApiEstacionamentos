var LugaresModel = require ('../models/LugaresModel');
var RegistoEntradasModel = require('../models/RegistoEntradasModel');



/*exports.LugaresVagos = function(req, res){
    LugaresModel.findOne({},function(err, lVagos){
        res.send(lVagos.qtd);
    })
}

exports.RegistaSaida = function(req, res){
    LugaresModel.findOne({}, function(err, saida){
        let lug = parseInt('' + saida.qtd, 10)
        saida.qtd = lug + 1;

        saida.save(function(err){
            
            if(err){
                throw err;
            }
        })
        console.log(saida.qtd);
        res.send('Saida registada com sucesso!')
    })
}

exports.MediaCarros = async function(req, res){

    let periodo = req.params.periodo;
    
    RegistoEntradasModel.countDocuments({}, function(err, registoEntradas){
        RegistoEntradasModel.findOne({},{_id: 0, dataEntrada: 1}).sort('_id').exec(function(err, datainicio){
            RegistoEntradasModel.findOne({},{_id: 0, dataEntrada: 1}).sort('-_id').exec(function(err, datafim){

                let diaMillis = 86400000;
                let mesMillis = 2628000000;
                let anoMillis = 31536000000;

                datainicio = datainicio.dataEntrada;
                datafim = datafim.dataEntrada;

                var datePartinicio = datainicio.split("/");

                // month is 0-based, that's why we need dataParts[1] - 1
                var dateObject = new Date(+datePartinicio[2], datePartinicio[1] - 1, +datePartinicio[0]);

                //var datafim = "24/12/2020"; // Oct 23

                var datePartsfim = datafim.split("/");

                // month is 0-based, that's why we need dataParts[1] - 1
                var dateObjects = new Date(+datePartsfim[2], datePartsfim[1] - 1, +datePartsfim[0]);

                var Millis = diaMillis;
                
                if(req.params.periodo == "meses"){
                    Millis = mesMillis;

                }else if(req.params.periodo == "anos"){
                    Millis = anoMillis;
                }

                var resultado = Math.trunc((dateObjects-dateObject) / Millis);

                //total de carros a dividir pelo numero de dias / meses / anos
                registoEntradas = Math.trunc((registoEntradas / resultado)*100)/100;

                console.log("Primeiro registo: "+datainicio);
                console.log("Ultimo registo: "+datafim);
                console.log('' + periodo + ' entre as duas datas: ' + resultado);

                res.send('' + periodo + ' entre as duas datas: ' + resultado +' a média de caros por '+ req.params.periodo + ' é: ' + registoEntradas)
            })
        })
    })    
};

exports.MaiorDia = async function(req, res){
    RegistoEntradasModel.aggregate([
		{$group: {"_id":"$dataEntrada",entrada: {$max: '$nEntrada'}}}
	],function(err,maximosE){

        //adaptado de https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value 02/05/2021
		function ordenar(a,b){
			if(a.entrada < b.entrada){
				return 1;
			}
			if(a.entrada > b.entrada){
				return -1;
			}
			return 0;
		}
		//ordena os dados
		maximosE.sort(ordenar);
		
        maximosE = maximosE.filter(p => p.entrada == maximosE[0].entrada);

		res.send(maximosE);
	});
}

exports.QtdDiaCarro = async function(req, res){
    let data = req.params.data;
    let matricula = req.params.matricula.toUpperCase();
    RegistoEntradasModel.countDocuments({dataEntrada: data, matricula: matricula}, function(err, resultado){
        //console.log('data: ' + resultado);
        res.send('O carro pesquisado entrou ' + resultado + ' vezes no dia ' + data)
    })
}

exports.QtdPeriodo = function(req, res){
    let dataInicio = req.params.DataInicio;
    let dataFim = req.params.DataFim;
    
    RegistoEntradasModel.countDocuments({$and:[{dataEntrada:{$gte: dataInicio}},{dataEntrada:{$lte: dataFim}}]}, function(err, nCarros){
        
        console.log(dataInicio);
        console.log(dataFim);
        console.log('Numero de carros: ' + nCarros);
        
        res.send('Entre as datas inseridas entraram: ' + nCarros + ' carros.');
    })
}*/
