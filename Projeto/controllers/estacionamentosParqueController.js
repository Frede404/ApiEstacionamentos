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
    let mesMillis = 2628000000;
    let anoMillis = 31536000000;

    let periodo = req.params.periodo;
   /* let primeiroRegisto = RegistoEntradas.findOne().sort('_id');
    let ultimoRegisto = RegistoEntradas.findOne().sort('-_id');
    let primeiraData = primeiroRegisto.dataEntrada;
    let ultimaData = ultimoRegisto.dataEntrada;*/


    var datainicio = "24/12/2019"; // Oct 23
    
    var datePartinicio = datainicio.split("/");

    // month is 0-based, that's why we need dataParts[1] - 1
    var dateObject = new Date(+datePartinicio[2], datePartinicio[1] - 1, +datePartinicio[0]);

    var datafim = "24/12/2020"; // Oct 23

    var datePartsfim = datafim.split("/");

    // month is 0-based, that's why we need dataParts[1] - 1
    var dateObjects = new Date(+datePartsfim[2], datePartsfim[1] - 1, +datePartsfim[0]);

    var Millis=diaMillis;
    
    if(req.params.periodo == "meses"){
        Millis=mesMillis;

    }else if(req.params.periodo == "anos"){
        Millis = anoMillis;
    }

    var resultado =(dateObjects-dateObject)/Millis;
    //console.log("dias entre as duas datas: " + resultado);

    res.send(''+periodo+' entre as duas datas: ' + Math.trunc(resultado))
};