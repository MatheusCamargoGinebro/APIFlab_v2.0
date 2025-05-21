// Inicializa a aplicação express e exporta a mesma para ser utilizada em outros arquivos.
const express = require("express");
const router = require("./router");

// Habilitando CORS
const cors = require("cors");

// Inicializa a aplicação express
const app = express();

app.use(cors()); // Habilita o CORS antes das rotas
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(router);

module.exports = app;
