//Framework express.js
const express = require('express');

// to serve auto-generated swagger-ui generated API docs from express
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('./ViewSwagger/swagger.json');

//Porto Lógico
const porto = 8081; 

const routes = require("./routes/estacionamentosRoutes");

//iniciar app express
const app = express();

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
