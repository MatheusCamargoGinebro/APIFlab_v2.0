// Inicializa a aplicação express e exporta a mesma para ser utilizada em outros arquivos.
const express = require("express");
const router = require("./router");

// Habilitando CORS
const cors = require("cors");

// Inicializa a aplicação express
const app = express();

app.use(
  cors({
    origin: "*", // permite qualquer origem
  })
); // Habilita o CORS antes das rotas

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  const methodsRequiringBody = ["POST", "PUT", "PATCH"];

  // Se o método for um dos que exigem body e não for logout
  if (
    methodsRequiringBody.includes(req.method) &&
    req.path !== "/users/logout"
  ) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: "Requisição sem corpo (body) não é permitida.",
      });
    }
  }

  next();
});

// Aplica as rotas
app.use(router);

module.exports = app;
