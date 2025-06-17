// O========================================================================================O

/*
    O=====================================================O
    |   Funções de models das informações dos usuários    |
    O=====================================================O

    Lista de funções:  
    - [] getUserByEmail
    - [] addToBlackList
    - [] getFromBlackList
    - [] saveVerificationCode
    - [] validateVerificationCode
    - [] discardCode
    - [] updateUserPassword
*/

// O========================================================================================O

// Importando módulos necessários:
const connection = require("../utils/connection");

// O========================================================================================O

// Função para obter um usuário pelo email:
const getUserByEmail = async (user_email) => {
  const query = "CALL getUserByEmail(?)";

  const [result] = await connection.execute(query, [user_email]);

  // Verificando se o resultado está vazio:
  if (result[0].length === 0) {
    return { status: false, data: null };
  } else {
    return { status: true, data: result[0][0] };
  }
};

// O============================================================O

// Função para adicionar um token à blacklist:
const addToBlackList = async (token) => {
  const query = "CALL addToBlackList(?)";

  const [result] = await connection.execute(query, [token]);

  if (result.affectedRows === 0) {
    return { status: false };
  } else {
    return { status: true };
  }
};

// O============================================================O

// Função para verificar se um token está na blacklist:
const getFromBlackList = async (token) => {
  const query = "CALL getFromBlackList(?)";

  const [result] = await connection.execute(query, [token]);

  if (result[0].length === 0) {
    return { status: false, data: null };
  } else {
    return { status: true, data: result[0][0] };
  }
};

// O============================================================O

// Função para salvar um código de verificação:
const saveVerificationCode = async (user_email, code, creationToken) => {
  const query = "CALL saveVerificationCode(?, ?, ?)";

  const [result] = await connection.execute(query, [
    user_email,
    code,
    creationToken,
  ]);

  if (result.affectedRows === 0) {
    return { status: false };
  } else {
    return { status: true };
  }
};

// O============================================================O

// Função para validar um código de verificação:
const validateVerificationCode = async (user_email, code) => {
  const query = "CALL validateVerificationCode(?, ?)";

  const [result] = await connection.execute(query, [user_email, code]);

  if (result[0].length === 0) {
    return { status: false, data: null };
  } else {
    return { status: true, data: result[0][0] };
  }
};

// O============================================================O

// Função para descartar um código de verificação:
const discardCode = async (user_email, code) => {
  const query = "CALL discardCode(?, ?)";

  const [result] = await connection.execute(query, [user_email, code]);

  if (result.affectedRows === 0) {
    return { status: false };
  } else {
    return { status: true };
  }
};

// O============================================================O

// Função para atualizar a senha do usuário:
const updateUserPassword = async (user_id, new_password) => {
  const query = "CALL updateUserPassword(?, ?)";

  const [result] = await connection.execute(query, [user_id, new_password]);

  if (result.affectedRows === 0) {
    return { status: false };
  } else {
    return { status: true };
  }
};

// O============================================================O

// O========================================================================================O

// Exportando módulos:
module.exports = {
  getUserByEmail,
  addToBlackList,
  getFromBlackList,
  saveVerificationCode,
  validateVerificationCode,
  discardCode,
  updateUserPassword,
};

// O========================================================================================O
