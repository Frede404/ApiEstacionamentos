var MatriculaModel = require ('../models/MatriculasModel');
var LugaresModel = require ('../models/LugaresModel');
var RegistoEntradasModel = require('../models/RegistoEntradasModel');

//populate de matriculas
exports.AddMatriculas = async function(req, res){
	
    let quantidade = req.params.n

    let listaMatriculas=[]

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
        let registo = new  MatriculaModel({
            _id: i,
            nMatricula: '' + numeroa + numerob + '-' + String.fromCharCode(letraa) +
             String.fromCharCode(letrab) + '-' + numeroc + numerod,
        });
        
        listaMatriculas.push(registo)
    }

    MatriculaModel.insertMany(listaMatriculas)
    
    res.send('Populate completo, pode ter de aguardar alguns minutos para estar acecivel na BD sao ' + (i-1) + ' dados'
    + '\n' + 'Nao desligue o servidor ou a importacao dos dados será cancelada!')
}

//apaga todas as matriculas registadas
exports.DelMatriculas = function(req, res){
    MatriculaModel.remove(function(err){
        if(err){
            throw err;
        }
        res.send('Matriculas Apagadas com sucesso!')
    }) 
}

//populate de registo de entradas
exports.AddEstacionamentos = async function(req, res){
    //todas as matriculas registadas
    MatriculaModel.find({},function(req, TodasMatriculas){
        //lotacao do parque
        LugaresModel.findById(1,function(req, registo){
            let lugares = parseInt('' + registo.maximo, 10);
            let PEntradas = 60;
            let LMinimo = -5;

            let data = new Date();
            let dia = data.getDate();
            let mes = data.getMonth()+1;
            let ano = data.getFullYear();

            let hoje = dia + '/' + mes + '/' + ano;

            //data inicial é o dia 1 de janeiro de 2 anos antes do atual
            let inicio = new Date();
            inicio.setFullYear(inicio.getFullYear() - 2,0,1);

            let diaI = inicio.getDate();
            let mesI = inicio.getMonth()+1;
            let anoI = inicio.getFullYear();

            let introduz = diaI + '/' + mesI + '/' + anoI;

            let diaIns=''
            let mesIns=''

            if(mesI<10){
                mesIns='/0'+mesI
            }else{
                mesIns='/'+mesI
            }
            if(diaI<10){
                diaIns='/0'+diaI
            }else{
                diaIns='/'+diaI
            }

            let introduzInv = anoI + mesIns + diaIns;
            //let introduzInv = anoI + '/' + mesI + '/' + diaI;

            let vagas = lugares/2;
            let correnteID=1
            let auxvagas=mesI
            let NovasEntradas=[]

            //ciclo para percorrer desde a data inicial até a data atual
            while(hoje != introduz){
                // valor aleatorio de entradas no dia a registar
                let entradas = Math.floor(Math.random()*(lugares+20)+1); 
                //inicializacao da quantidade de carros que entram no dia
                let entrada = 1
                if(auxvagas!=mesI){
                vagas = lugares/2;}
                //ciclo para registar as entradas do dia a introduzir
                for(i=1; i<=entradas; i++){
                    //variavel aleatoria para saber se vai registar uma entrada
                    let tipo=Math.floor(Math.random()*100+1);
                    //forca nao haver saidas ou entradas de mais
                    if(vagas <= LMinimo && tipo <= PEntradas){
                        tipo=100                        
                    }else if(vagas == lugares && tipo > PEntradas){
                        tipo=1
                    }

                    //regista entrada ou atualiza a lotacao com a saida
                    if(tipo <= PEntradas){
                        let horas = data.getHours() + ':' + data.getMinutes()

                        //registar entrada de uma matricula conhecida ou desconhecida
                        if(Math.floor(Math.random()*100+1)<=80){
                            //escolher uma matricula aleatoria para registar a entrada
                            let posicaoMatricula = Math.floor(Math.random()*((TodasMatriculas.length-1)+1))
                            matriculaInserir=TodasMatriculas[posicaoMatricula].nMatricula
                            Mregistada=true
                        }else{
                            matriculaInserir='-';
                            Mregistada=false
                        }

                        let NovaEntrada = new RegistoEntradasModel({
                            _id: correnteID,
                            matricula: matriculaInserir,
                            dataEntrada: introduz,
                            dataEntradaInv: introduzInv,
                            horaEntrada: horas,
                            registada: Mregistada,
                            lotacao: vagas,
                            nEntrada: entrada
                        })
                        NovasEntradas.push(NovaEntrada)

                        //atualizacao de variaveis
                        vagas=vagas-1
                        entrada = entrada+1
                        correnteID=correnteID+1
                    }else{
                        vagas=vagas+1
                    }
                }

                //atualizacao do dia a introduzir
                inicio.setDate(inicio.getDate() + 1);
                diaI = inicio.getDate();
                mesI = inicio.getMonth()+1;
                anoI = inicio.getFullYear();

                introduz = diaI + '/' + mesI + '/' + anoI;

                diaIns=''
                mesIns=''

                if(mesI<10){
                    mesIns='/0'+mesI
                }else{
                    mesIns='/'+mesI
                }
                if(diaI<10){
                    diaIns='/0'+diaI
                }else{
                    diaIns='/'+diaI
                }

                introduzInv = anoI + mesIns + diaIns;
                //introduzInv = anoI + '/' + mesI + '/' + diaI;
            }

            console.log(NovasEntradas)
            RegistoEntradasModel.insertMany(NovasEntradas)

            res.send('Populate completo, pode ter de aguardar alguns minutos para estar acecivel na BD sao ' + (correnteID-1) + ' dados'
            + '\n' + 'Nao desligue o servidor ou a importacao dos dados será cancelada!')
        })
    })
}   

exports.DelEstacionamentos = function(req, res){ 
    RegistoEntradasModel.remove(function(err){
        if(err){
            throw err;
        }
        res.send('Matriculas Apagadas com sucesso!')
    })
}

exports.AddMatricula = async function(req, res){
	
    let matriculaInserir = req.params.matricula.toUpperCase();
    MatriculaModel.findOne().sort('-_id').exec(function(err,ultimoID){
        //formata a matricula para ser inserida
        let registo = new  MatriculaModel({
            _id: (parseInt('' + ultimoID.id, 10)+1),
            nMatricula: matriculaInserir,
        });
        
        registo.save(function(err){
                
            if(err){
                throw err;
            }
        })
        
        res.send('Matricula Registada com sucesso!')
    })
}

exports.ResetParque = async function(req, res){
    let quantidade = req.params.n

    LugaresModel.findById(1, function (err, registo) {
        if(registo == null){
            registo = new  LugaresModel({
                _id: 1,
                qtd: quantidade,
                maximo: quantidade
            });
        }else{
            registo.qtd = quantidade
            registo.maximo = quantidade
        }

        //reset
        registo.save(function(err){
            
            if(err){
                throw err;
            }
        })
        
        res.send('reset feito com sucesso!')
    })
}