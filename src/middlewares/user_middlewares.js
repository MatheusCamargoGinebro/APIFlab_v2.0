// O============================================================================================O

/*
    O=================================================================O
    |   Arquivo de configuração de entradas para o objeto usuários    |
    O=================================================================O

    Lista de entradas possíveis na API:
    - [X] user_email
    - [X] user_password
    - [X] user_validation_code
    - [X] user_name
    - [X] user_type
    - [X] user_admin_level
    - [X] user_id
    - [X] user_creation_token 
    - [X] user_check_token
*/

// O============================================================================================O

// Importando as dependências:
const { request } = require("express");
const JWT = require("jsonwebtoken");

// O============================================================================================O

// Definindo as validações de entrada para o objeto usuários:

// Validação para o email do usuário:
const user_email = (request, response, next) => {
  const { user_email } = request.body;
  if (
    !user_email ||
    typeof user_email !== "string" ||
    user_email === "" ||
    user_email === null ||
    user_email === undefined ||
    user_email.length === 0 ||
    user_email.length > 256 ||
    user_email.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "user_email" é obrigatório e deve ser uma string não vazia, de tamanho mínimo de 0 e máximo 256 caracteres.',
      error_at: "user_email",
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(aluno\.)?ifsp\.edu\.br$/;
  if (!emailRegex.test(user_email)) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "user_email" deve ser um email válido do IFSP.',
      error_at: "user_email",
    });
  }

  next();
};

// Validação para a senha do usuário:
const user_password = (request, response, next) => {
  const { user_password } = request.body;

  if (
    !user_password ||
    typeof user_password !== "string" ||
    user_password === "" ||
    user_password === null ||
    user_password === undefined ||
    user_password.length !== 60
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "user_password" é obrigatório e deve ser uma string de tamanho exato de 60 caracteres.',
      error_at: "user_password",
    });
  }

  next();
};

// Validação para o código de validação do usuário:
const user_validation_code = (request, response, next) => {
  const { user_validation_code } = request.body;

  if (
    !user_validation_code ||
    typeof user_validation_code !== "string" ||
    user_validation_code === "" ||
    user_validation_code === null ||
    user_validation_code === undefined ||
    user_validation_code.length !== 5
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "user_validation_code" é obrigatório e deve ser uma string de tamanho exato de 5 caracteres.',
      error_at: "user_validation_code",
    });
  }

  next();
};

// Validação para o nome do usuário:
const user_name = (request, response, next) => {
  const { user_name } = request.body;

  if (
    !user_name ||
    typeof user_name !== "string" ||
    user_name === "" ||
    user_name === null ||
    user_name === undefined ||
    user_name.length === 0 ||
    user_name.length > 128 ||
    user_name.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "user_name" é obrigatório e deve ser uma string não vazia, de tamanho mínimo de 0 e máximo 128 caracteres.',
      error_at: "user_name",
    });
  }

  next();
};

const user_type = (request, response, next) => {
  const { user_type } = request.body;

  if (
    !user_type ||
    typeof user_type !== "string" ||
    user_type === "" ||
    user_type === null ||
    user_type === undefined ||
    (user_type !== "Aluno" && user_type !== "Funcionário")
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "user_type" é obrigatório e deve ser uma string com o valor "Aluno" ou "Funcionário".',
      error_at: "user_type",
    });
  }

  next();
};

// Validação para o nível de administrador do usuário: (1-3)
const user_admin_level = (request, response, next) => {
  const { user_admin_level } = request.body;

  if (
    !user_admin_level ||
    typeof user_admin_level !== "number" ||
    user_admin_level === "" ||
    user_admin_level === null ||
    user_admin_level === undefined ||
    user_admin_level < 1 ||
    user_admin_level > 3 ||
    !Number.isInteger(user_admin_level) ||
    isNaN(user_admin_level)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "user_admin_level" é obrigatório e deve ser um número entre 1 e 3.',
      error_at: "user_admin_level",
    });
  }

  next();
};

// Validação para o ID do usuário:
const user_id = (request, response, next) => {
  const { user_id } = request.body;

  if (
    !user_id ||
    typeof user_id !== "number" ||
    user_id === "" ||
    user_id === null ||
    user_id === undefined ||
    user_id < 1 ||
    !Number.isInteger(user_id) ||
    isNaN(user_id)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "user_id" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "user_id",
    });
  }

  next();
};

// Função de validação para os dois middlewares que tratam de tokens:
const JWT_TOKEN_VALIDATOR = async (token) => {
  // 'async' é importante para a parte da blocklist (que é assíncrona)

  if (
    !token ||
    typeof token !== "string" ||
    token.trim() === "" ||
    token.length === 0 ||
    token === null ||
    token === undefined
  ) {
    return {
      status: false,
      msg: "Token não fornecido ou inválido (vazio).",
    };
  }

  /*
    // 2. Verifica se o token está na blocklist do banco de dados (descomente para ativar)
    try {
        const isInBlocklist = await blackListModels.getFromBlackList(token);

        if (isInBlocklist.status === true) {
            return {
                status: false,
                msg: "Token descartado ou revogado." // Mensagem mais clara
            };
        }
    } catch (dbError) {
        // Loga o erro do banco de dados, mas não revela detalhes ao cliente
        console.error("Erro ao verificar token na blocklist:", dbError.message);
        return {
            status: false,
            msg: "Erro interno do servidor ao validar o token."
        };
    }
    */

  // 3. Tenta verificar o token JWT usando a chave secreta
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    // Se todas as verificações passarem (incluindo a blocklist se ativada)
    return {
      status: true,
      data: decoded,
    };
  } catch (error) {
    // Captura e diferencia os erros comuns de verificação do JWT
    let msg = "Token inválido.";
    if (error.name === "TokenExpiredError") {
      msg = "Token expirado.";
    } else if (error.name === "JsonWebTokenError") {
      // Este é um erro genérico para tokens com formato inválido, assinatura incorreta, etc.
      msg = "Token inválido ou adulterado.";
    }
    return {
      status: false,
      msg: msg,
    };
  }
};

// Validação para o token de criação do usuário:
const user_creation_token = async (request, response, next) => {
  const { user_creation_token } = request.body;

  const validationResult = await JWT_TOKEN_VALIDATOR(user_creation_token);

  if (!validationResult.status) {
    return response.status(401).json({
      status: false,
      msg: validationResult.msg,
      error_at: "user_creation_token",
    });
  }

  next();
};

// Validação para o token de verificação do usuário:
const user_check_token = async (request, response, next) => {
  const { user_check_token } = request.body;

  const validationResult = await JWT_TOKEN_VALIDATOR(user_check_token);

  if (!validationResult.status) {
    return response.status(401).json({
      status: false,
      msg: validationResult.msg,
      error_at: "user_check_token",
    });
  }

  next();
};

// O============================================================================================O

// Exportando as validações:
module.exports = {
  user_email,
  user_password,
  user_validation_code,
  user_name,
  user_type,
  user_admin_level,
  user_id,
  user_creation_token,
  user_check_token,
};

// O============================================================================================O
