var LugaresModel = require ('../models/LugaresModel');
var RegistoEntradasModel = require('../models/RegistoEntradasModel');
var MatriculaModel = require ('../models/MatriculasModel');

exports.LugaresVagos = function(req, res){
    LugaresModel.findOne({},function(err, lVagos){
        res.send(lVagos.qtd);
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
    
    //formatar a data e hora para string
    let dia =dataTime.getDate()
    let mes =(dataTime.getMonth()+1)
    let ano =dataTime.getFullYear()

    let data = dia + '/' + mes + '/' + ano;
    
    let aux_dia=''
    let aux_mes=''

    if(dia<10){
        aux_dia='/0'+dia
    }else{
        aux_dia='/'+dia
    }

    if(dia<10){
        aux_mes='/0'+mes
    }else{
        aux_mes='/'+mes
    }

    let datainv = ano + aux_mes + aux_dia
    let horas = dataTime.getHours() + ':' + dataTime.getMinutes()

    //colocar a matricula em maiusculas para prevenir desleixo do utilizador
    let matriculaInserir = req.params.matricula.toUpperCase();

    //averiguar se a matricula está registada
    MatriculaModel.countDocuments({nMatricula: matriculaInserir},function(err, qtdmatricula){
        //saber qual o ultimo id de entrada de modo a ficar sequencial
        RegistoEntradasModel.findOne().sort('-_id').exec(function(err,ultimoID){
            //saber qual a lotacao atual do parque
            LugaresModel.findById(1, function(err,lugares){
                //saber quantos carros entraram no dia em que o carro está a entrar
                RegistoEntradasModel.countDocuments({dataEntrada: dia},function(err, entrada){
                    entrada=entrada+1;
                    
                    //preparar o id do registo
                    let correnteID=0;                    
                    if(ultimoID == null){
                        correnteID=0;
                    }else{
                        correnteID = parseInt('' + ultimoID.id, 10);
                    }
                    correnteID=correnteID+1;

                    //verificar existencia da matricula nos registos
                    let Mregistada=true;
                    if(qtdmatricula<=0){
                        matriculaInserir='-';
                        Mregistada=false;
                    }

                    let auxlugar = parseInt('' + lugares.qtd, 10);

                    let registo = new RegistoEntradasModel({
                        _id: correnteID,
                        matricula: matriculaInserir,
                        dataEntrada: data,
                        dataEntradaInv: datainv,
                        horaEntrada: horas,
                        registada: Mregistada,
                        lotacao: auxlugar,
                        nEntrada: entrada
                    })

                    auxlugar= auxlugar -1;

                    //registo da nova entrada
                    registo.save(function (err){
                        if(err){
                            throw err;
                        }

                        //atualizacao da lotacao do parque
                        lugares.qtd=auxlugar
                        lugares.save(function (err){
                            if(err){
                                throw err;
                            }
                        })
                    })

                    res.send('Entrada no dia ' + data + ' e as ' + horas + ' horas registada com sucesso!')
                })
            })
        })
        
    })
}

exports.RegistaSaida = function(req, res){
    LugaresModel.findOne({}, function(err, saida){
        let lug = parseInt('' + saida.qtd, 10)
        saida.qtd = lug + 1;

        //atualizacao da lotacao do parque
        saida.save(function(err){
            if(err){
                throw err;
            }
        })
        res.send('Saida registada com sucesso!')
    })
}

exports.MediaCarros = async function(req, res){

    let periodo = req.params.periodo;
    
    //quantidade de entradas registadas
    RegistoEntradasModel.countDocuments({}, function(err, registoEntradas){
        //descobrir o primeiro registo da base de dados
        RegistoEntradasModel.findOne({},{_id: 0, dataEntrada: 1}).sort('_id').exec(function(err, datainicio){
            //descobrir o ultimo registo da base de dados
            RegistoEntradasModel.findOne({},{_id: 0, dataEntrada: 1}).sort('-_id').exec(function(err, datafim){

                let diaMillis = 86400000;
                let mesMillis = 2628000000;
                let anoMillis = 31536000000;
                let periodos = req.params.periodo;

                datainicio = datainicio.dataEntrada;
                datafim = datafim.dataEntrada;

                var datePartinicio = datainicio.split("/");

                // month is 0-based, that's why we need dataParts[1] - 1
                var dateObject = new Date(+datePartinicio[2], datePartinicio[1] - 1, +datePartinicio[0]);

                var datePartsfim = datafim.split("/");

                // month is 0-based, that's why we need dataParts[1] - 1
                var dateObjects = new Date(+datePartsfim[2], datePartsfim[1] - 1, +datePartsfim[0]);

                //variavel de divisao para o calculo
                var Millis = diaMillis;
                
                if(periodos == "meses"){
                    Millis = mesMillis;

                }else if(periodos == "anos"){
                    Millis = anoMillis;
                }

                var resultado = Math.trunc((dateObjects-dateObject) / Millis);

                //total de carros a dividir pelo numero de dias / meses / anos
                registoEntradas = Math.trunc((registoEntradas / resultado)*100)/100;

                /*console.log("Primeiro registo: "+datainicio);
                console.log("Ultimo registo: "+datafim);
                console.log('' + periodo + ' entre as duas datas: ' + resultado);*/

                res.json({
                    Periodo: periodos,
                    media: registoEntradas
                });
            })
        })
    })    
};

exports.QtdDia = function(req, res){
	RegistoEntradasModel.find({dataEntrada: req.params.data},function(err,registos){
		res.send(registos);
	})
}

exports.QtdNRegistados = function(req, res){
	RegistoEntradasModel.find({dataEntrada: req.params.data, matricula: '-'},function(err,registos){
		res.send(registos);
	})
}

exports.MaiorDia = async function(req, res){
    //descobrir o maximo de entradas por dia
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
		
        //remove os dados que nao tenham o campo entrada desejado
        maximosE = maximosE.filter(p => p.entrada == maximosE[0].entrada);

		res.send(maximosE);
	});
}

exports.MenorDia = async function(req, res){
    //descobrir o maximo de entradas por dia
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

exports.QtdDiaCarro = async function(req, res){
    let data = req.params.data;
    let matricula = req.params.matricula.toUpperCase();

    RegistoEntradasModel.countDocuments({dataEntrada: data, matricula: matricula}, function(err, resultado){
        res.json({
            contagem: resultado,
            dia: data
        });
    })
}
//aqui
exports.QtdPeriodo = function(req, res){
    let dataInicio = req.params.DataInicio;
    let dataFim = req.params.DataFim;

    var datePartinicio = dataInicio.split("/");

    let aux_dia_inicio=''
    let aux_mes_inicio=''

    if(datePartinicio[0].length==1){
        aux_dia_inicio='/0'+datePartinicio[0]
    }else{
        aux_dia_inicio='/'+datePartinicio[0]
    }

    if(datePartinicio[1].length==1){
        aux_mes_inicio='/0'+datePartinicio[1]
    }else{
        aux_mes_inicio='/'+datePartinicio[1]
    }

    //var dataInicial = datePartinicio[2] + '/' + datePartinicio[1] + '/' + datePartinicio[0];
    var dataInicial = datePartinicio[2] + aux_mes_inicio + aux_dia_inicio;

    var datePartsfim = dataFim.split("/");

    let aux_dia_fim=''
    let aux_mes_fim=''

    if(datePartsfim[0].length==1){
        aux_dia_fim='/0'+datePartsfim[0]
    }else{
        aux_dia_fim='/'+datePartsfim[0]
    }

    if(datePartsfim[1].length==1){
        aux_mes_fim='/0'+datePartsfim[1]
    }else{
        aux_mes_fim='/'+datePartsfim[1]
    }

    //var dataFinal = datePartsfim[2] + '/' + datePartsfim[1] + '/' + datePartsfim[0];
    var dataFinal = datePartsfim[2] + aux_mes_fim + aux_dia_fim;

    RegistoEntradasModel.countDocuments({$and:[{dataEntradaInv:{$gte: dataInicial}},{dataEntradaInv:{$lte: dataFinal}}]}, function(err, nCarros){
        res.json({
            Quantidade: nCarros
        });
    })
}

exports.DiasLotado2 = function(req, res){
	RegistoEntradasModel.count({lotacao: {$lte:'0'}},function(err,registos){
        console.log(registos)
		res.json(registos);
	})
}

exports.DiasLotado = function(req, res){
    /*RegistoEntradasModel.aggregate([
        {$group: {"_id":"$dataEntradaInv",count: { $sum: 1 }}}
    ],function(err,registos){
        let ListaRegisto=[]
        console.log(registos)
        let quantidade = registos.length
        console.log(quantidade)
        for(i=0; i<quantidade; i++){
            ListaRegisto.push(registos[i]._id)
        }
        //console.log(registos)
        res.send(ListaRegisto);
    })*/
    RegistoEntradasModel.aggregate([
        {$match: {lotacao: {$lte: 0}}},
        {$group: {"_id":"$dataEntradaInv",count: { $sum: 1 }}}
    ]).sort('_id').exec(function(err,registos){
        let ListaRegisto=[]
        let quantidade = registos.length
        
        for(i=0; i<quantidade; i++){
            let dataInicio = registos[i]._id;

            var datePartinicio = dataInicio.split("/");

            var data = datePartinicio[2] + '/' + datePartinicio[1] + '/' + datePartinicio[0];

            //ListaRegisto.push(registos[i]._id)
            ListaRegisto.push(data)
        }
        res.send(ListaRegisto);
    })
}