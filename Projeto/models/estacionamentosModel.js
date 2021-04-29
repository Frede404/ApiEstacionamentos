const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RegistoSchema = new Schema({
    _id: {
        type: Number, 
        generated: false, 
        default: 1
    },
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

//Exportar o modelo
module.exports = mongoose.model('Registo', RegistoSchema);