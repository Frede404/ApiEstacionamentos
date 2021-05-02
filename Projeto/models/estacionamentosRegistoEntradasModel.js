const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RegistoEntradasSchema = new Schema({
    _id: {
        type: Number, 
        generated: false, 
        default: 1
    },
    matricula: {
        type: String,
        required: true
    },
    dataEntrada: {
        type: String,
        required: true
    },
    dataEntradaInv: {
        type: String,
        required: true
    },
    horaEntrada: {
        type: String,
        required: true
    },
    registada: {
        type: Boolean,
        required: true
    },
    lotacao: {
        type: Number,
        required: true
    },
    nEntrada: {
        type: Number,
        required: true
    }
});

//Exportar o modelo
module.exports = mongoose.model('RegistoEntradas', RegistoEntradasSchema);