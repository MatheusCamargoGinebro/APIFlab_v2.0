// O============================================================================================O

/*
    O==================================================================O
    |   Arquivo de configuração de entradas para o objeeto usuários    |
    O==================================================================O

    Lista de entradas para o objeto usuários na API:
    - [] email
    - [] password
    - [] validationCode
    - [] name
    - [] type
    - [] campusId
    - [] creationToken
*/

// O============================================================================================O

// Importando as dependências:
const JWT = require("jsonwebtoken");

// O============================================================================================O

// Definindo as validações para o objeto usuários:

// - email:
const email = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === "" || email === null || email === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "email",
      message: "Campo email não pode ser vazio.",
    });
  }

  if (typeof email !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "email",
      message: "Campo email deve ser do tipo string.",
    });
  }

  // aceita emails assim:
  // <nome>@aluno.ifsp.edu.br
  // <nome>@ifsp.edu.br
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(aluno\.)?ifsp\.edu\.br$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: false,
      error_at: "email",
      message: "Campo email deve ser um email válido do IFSP.",
    });
  }

  if (email.length > 256) {
    return res.status(400).json({
      status: false,
      error_at: "email",
      message: "Campo email deve ter no máximo 256 caracteres.",
    });
  }

  next();
};

// - password:
const password = (req, res, next) => {
  const { password } = req.body;

  if (
    !password ||
    password === "" ||
    password === null ||
    password === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "password",
      message: "Campo senha não pode ser vazio.",
    });
  }

  if (typeof password !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "password",
      message: "Campo senha deve ser do tipo string.",
    });
  }

  if (password.length != 60) {
    return res.status(400).json({
      status: false,
      error_at: "password",
      message: "Campo senha mal formatado.",
    });
  }

  next();
};

// - validationCode:
const validationCode = (req, res, next) => {
  const { validationCode } = req.body;

  if (
    !validationCode ||
    validationCode === "" ||
    validationCode === null ||
    validationCode === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "validationCode",
      message: "Campo código de validação não pode ser vazio.",
    });
  }

  if (typeof validationCode !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "validationCode",
      message: "Campo código de validação deve ser do tipo string.",
    });
  }

  if (validationCode.length != 5) {
    return res.status(400).json({
      status: false,
      error_at: "validationCode",
      message: "Campo código de validação deve ter 5 caracteres.",
    });
  }

  next();
};

// - name:
const name = (req, res, next) => {
  const { name } = req.body;

  if (
    !name ||
    name === "" ||
    name === null ||
    name === undefined ||
    name.length === 0
  ) {
    return res.status(400).json({
      status: false,
      error_at: "name",
      message: "Campo nome não pode ser vazio.",
    });
  }

  if (typeof name !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "name",
      message: "Campo nome deve ser do tipo string.",
    });
  }

  if (name.length > 128) {
    return res.status(400).json({
      status: false,
      error_at: "name",
      message: "Campo nome deve ter no máximo 128 caracteres.",
    });
  }

  next();
};

// - type:
const type = (req, res, next) => {
  const { type } = req.body;

  if (!type || type === "" || type === null || type === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "type",
      message: "Campo tipo não pode ser vazio.",
    });
  }

  if (typeof type !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "type",
      message: "Campo tipo deve ser do tipo string.",
    });
  }

  if (type !== "Aluno" && type !== "Funcionário") {
    return res.status(400).json({
      status: false,
      error_at: "type",
      message: "Campo tipo deve ser 'Aluno' ou 'Funcionário'.",
    });
  }

  next();
};

// - campusId:
const campusId = (req, res, next) => {
  const { campusId } = req.body;

  if (
    !campusId ||
    campusId === "" ||
    campusId === null ||
    campusId === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "campusId",
      message: "Campo campusId não pode ser vazio.",
    });
  }

  if (typeof campusId !== "number" || !Number.isInteger(campusId)) {
    return res.status(400).json({
      status: false,
      error_at: "campusId",
      message: "Campo campusId deve ser um número inteiro.",
    });
  }

  next();
};

// - creationToken:
const creationToken = (req, res, next) => {
  const { creationToken } = req.body;

  if (
    !creationToken ||
    creationToken === "" ||
    creationToken === null ||
    creationToken === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "creationToken",
      message: "Campo creationToken não pode ser vazio.",
    });
  }

  if (typeof creationToken !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "creationToken",
      message: "Campo creationToken deve ser do tipo string.",
    });
  }

  if (creationToken.length > 256) {
    return res.status(400).json({
      status: false,
      error_at: "creationToken",
      message: "Campo creationToken deve ter no máximo 256 caracteres.",
    });
  }

  try {
    JWT.verify(creationToken, process.env.CREATION_TOKEN_SECRET);
  } catch (error) {
    return res.status(400).json({
      status: false,
      error_at: "creationToken",
      message: "Campo creationToken inválido.",
    });
  }

  next();
};

// O============================================================================================O

// Exportando as validações:
module.exports = {
  email,
  password,
  validationCode,
  name,
  type,
  campusId,
  creationToken,
};

// O============================================================================================O
