var LugaresModel = require ('../models/estacionamentosLugaresModel');
var RegistoEntradasModel = require('../models/estacionamentosRegistoEntradasModel');

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

    let periodo = req.params.periodo;
    /*let primeiroRegisto = RegistoEntradasModel.findOne().sort('_id');
    let ultimoRegisto = RegistoEntradasModel.findOne().sort('-_id');*/
    /*let datainicio = primeiroRegisto.dataEntrada;
    let datafim = ultimoRegisto.dataEntrada;*/

    //console.log("primeiro registo "+primeiroRegisto);

    //console.log("data inicio (" + datainicio + ") data fim: (" + datafim + ")");

    
    
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

    //console.log(registoEntradas);
    
    //var datainicio = "24/12/2019"; // Oct 23
    
    

    //console.log("dias entre as duas datas: " + resultado);

    
};

exports.MaiorDia = async function(req, res){

    RegistoEntradas.aggregate([{$group:{"dataEntrada": "", totalDia: {$count: "$_id"}}}]);

    res.send('')
}

