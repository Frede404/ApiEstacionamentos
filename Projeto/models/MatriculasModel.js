const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MatriculasSchema = new Schema({
    _id: {
        type: Number, 
        generated: false, 
        default: 1
    },
    nMatricula: {
        type: String,
        required: true
    }
});

//Exportar o modelo
module.exports = mongoose.model('Matriculas', MatriculasSchema);