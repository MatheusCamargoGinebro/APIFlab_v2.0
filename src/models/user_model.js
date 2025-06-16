// O========================================================================================O

/*
    O=====================================================O
    |   Funções de models das informações dos usuários    |
    O=====================================================O

    Lista de funções:  
    - [] getUserByEmail
    - [] addToBlackList
    - [] getFromBlackList
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

// O========================================================================================O

// Exportando módulos:
module.exports = {
  getUserByEmail,
  addToBlackList,
  getFromBlackList,
};

// O========================================================================================O
