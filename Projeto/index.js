//Framework express.js
const express = require('express');

// to serve auto-generated swagger-ui generated API docs from express
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('./ViewSwagger/swagger.json');

//Porto Lógico
const porto = 8081; 

//inicializacao das routesdos Administradores
const MatriculasRoutes = require("./routes/AdministracaoRoutes");
//inicializacao das routes do parque
const ParqueRoutes = require("./routes/ParqueRoutes");
//inicializacao das routes dos users
const UserRoutes = require("./routes/UserRoutes");

//iniciar app express
const app = express();

//import mongoose library
const mongoose = require('mongoose');

//acesso a mongoDB
let url = "mongodb+srv://TrabalhoEstacionamento:TEstacionamento123@estacionamentos.l18xu.mongodb.net/EstacionamentoDB?retryWrites=true&w=majority";
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

app.use("/Administracao", MatriculasRoutes);
app.use("/Parque", ParqueRoutes);
app.use("/Utilizador", UserRoutes);

app.use(express.json());

// Iniciar servidor
app.listen(porto, () => {
	console.log('Servidor a executar no porto ' + porto);
});
