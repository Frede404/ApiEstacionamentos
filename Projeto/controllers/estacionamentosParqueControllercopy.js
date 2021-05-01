var LugaresModel = require ('../models/estacionamentosLugaresModel');
var RegistoEntradasModel = require('../models/estacionamentosRegistoEntradasModel');
var MatriculaModel = require ('../models/estacionamentosMatriculasModel');

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

	let matriculaInserir = req.params.matricula;

	MatriculaModel.countDocuments({nMatricula: matriculaInserir.toUpperCase()},function(err, qtdmatricula){
		RegistoEntradasModel.findOne().sort('-_id').exec(function(err,ultimoID){
			LugaresModel.findById(1, function(err,lugares){
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
				auxlugar= auxlugar -1;

				let registo = new RegistoEntradasModel({
					_id: correnteID,
					matricula: matriculaInserir,
					dataEntrada: req.params.datatestes,//dia,aqui
					horaEntrada: horas,
					registada: Mregistada,
					lotacao: auxlugar
				})

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
}