var LugaresModel = require ('../models/estacionamentosLugaresModel');
var RegistoEntradasModel = require('../models/estacionamentosRegistoEntradasModel');
var MatriculaModel = require ('../models/estacionamentosMatriculasModel');

exports.DelEstacionamentos = function(req, res){
    RegistoEntradasModel.remove(function(err){
        if(err){
            throw err;
        }
        res.send('Matriculas Apagadas com sucesso!')
    })
}

exports.RegistaEntrada = async function(req, res){
    //Data do sistema
	let timeStamp = Date.now();
	let dataTime = new Date(timeStamp);
	/*let dia = dataTime.getDate();
	let mes = dataTime.getMonth()+1;
	let ano = dataTime.getFullYear();
	let horas = dataTime.getHours();
	let minutos = dataTime.getMinutes();
	let segundos = dataTime.getSeconds();*/
	
	let dia = dataTime.getDate() + '/' + (dataTime.getMonth()+1) + '/' + dataTime.getFullYear();
	let horas = dataTime.getHours() + ':' + dataTime.getMinutes()

	let matriculaInserir = req.params.matricula.toUpperCase();

	MatriculaModel.countDocuments({nMatricula: matriculaInserir},function(err, qtdmatricula){
		RegistoEntradasModel.findOne().sort('-_id').exec(function(err,ultimoID){
			LugaresModel.findById(1, function(err,lugares){
			RegistoEntradasModel.countDocuments({dataEntrada: req.params.datatestes/*dia*/},function(err, entrada){
					entrada=entrada+1;

					let correnteID=0;

					if(ultimoID == null){
						correnteID=0;
					}else{
						correnteID = parseInt('' + ultimoID.id, 10);
					}
					correnteID=correnteID+1;

					let Mregistada=true;

					if(qtdmatricula<=0){
						matriculaInserir='-';
						Mregistada=false;
					}

					let auxlugar = parseInt('' + lugares.qtd, 10);
					

					var datainicio = req.params.datatestes
		
					var datePartinicio = datainicio.split("/");
				
					// month is 0-based, that's why we need dataParts[1] - 1
					var dateObject = new Date(+datePartinicio[2], datePartinicio[1] - 1, +datePartinicio[0]);

					let registo = new RegistoEntradasModel({
						_id: correnteID,
						matricula: matriculaInserir,
						dataEntrada: req.params.datatestes,//dia,//aqui
						dataEntradaInv: dateObject,//dataTime.getFullYear() + '/' + (dataTime.getMonth()+1) + '/' + dataTime.getDate(),
						horaEntrada: horas,
						registada: Mregistada,
						lotacao: auxlugar,
						nEntrada: entrada
					})

					auxlugar= auxlugar -1;

					registo.save(function (err){
						if(err){
							throw err;
						}

						lugares.qtd=auxlugar
						lugares.save(function (err){
							if(err){
								throw err;
							}
						})
					})

					res.send('Entrada no dia ' + dia + ' e as ' + horas + ' horas registada com sucesso!')
				})
			})
		})
		
	})
}

exports.QtdDia = function(req, res){
	RegistoEntradasModel.find({dataEntrada: req.params.data},function(err,registos){
		res.send(registos);
	})
}

exports.QtdNRegistados = function(req, res){
	/*var datainicio = req.params.data
    
	var datePartinicio = datainicio.split("/");

	// month is 0-based, that's why we need dataParts[1] - 1
	var dateObject = new Date(+datePartinicio[2], datePartinicio[1] - 1, +datePartinicio[0]);

	RegistoEntradasModel.find({dataEntradaInv: {$lte: dateObject}},function(err,registos){
		res.send(registos);
	})*/
	RegistoEntradasModel.find({dataEntrada: req.params.data, matricula: '-'},function(err,registos){
		res.send(registos);
	})
}

exports.MenorDia = async function(req, res){
	RegistoEntradasModel.aggregate([
		{$group: {"_id":"$dataEntrada",entrada: {$max: '$nEntrada'}}}
	],function(err,registos){

		//adaptado de https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value 02/05/2021
		function ordenar(a,b){
			if(a.entrada < b.entrada){
				return -1;
			}
			if(a.entrada > b.entrada){
				return 1;
			}
			return 0;
		}
		//ordena os dados
		registos.sort(ordenar);

		//remove os dados que nao tenham o campo entrada desejado
		registos=registos.filter(a => a.entrada == registos[0].entrada);

		res.send(registos);
	});
}

exports.DiasLotado = function(req, res){
	RegistoEntradasModel.find({lotacao: {$lte:'0'}},function(err,registos){
		res.send(registos);
	})
}