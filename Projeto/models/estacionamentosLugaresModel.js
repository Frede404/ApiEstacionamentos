const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LugaresSchema = new Schema({
    _id: {
        type: Number, 
        generated: false, 
        default: 1
    },
    qtd: {
        type: String,
        required: true
    }
});

//Exportar o modelo
module.exports = mongoose.model('Lugares', LugaresSchema);