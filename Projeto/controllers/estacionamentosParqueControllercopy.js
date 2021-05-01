var Lugares = require ('../models/estacionamentosLugaresModel');
var estacionamentosRegistoEntradasModel = require('../models/estacionamentosRegistoEntradasModel');

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