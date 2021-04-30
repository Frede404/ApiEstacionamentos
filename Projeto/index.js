//Framework express.js
const express = require('express');

// to serve auto-generated swagger-ui generated API docs from express
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('./ViewSwagger/swagger.json');

//Porto Lógico
const porto = 8081; 

const routes = require("./routes/estacionamentosMatriculasRoutes");

//iniciar app express
const app = express();

//acesso a bd
/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://TrabalhoEstacionamento:TEstacionamento123@estacionamentos.l18xu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
 const collection = client.db("test").collection("devices");
 // perform actions on the collection object
 client.close();
});
*/

//import mongoose library
const mongoose = require('mongoose');
//acesso a mongoDB
let url = "mongodb+srv://TrabalhoEstacionamento:TEstacionamento123@estacionamentos.l18xu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na ligação a MongoDB!'));

app.use(
  '/api',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.use("/", routes);

app.use(express.json());
// Iniciar servidor
app.listen(porto, () => {
	console.log('Servidor a executar no porto ' + porto);
});
