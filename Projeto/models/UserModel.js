const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsersSchema = new Schema({
    _id: {
        type: Number, 
        generated: false, 
        default: 1
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
});

//Exportar o modelo
module.exports = mongoose.model('Users', UsersSchema);