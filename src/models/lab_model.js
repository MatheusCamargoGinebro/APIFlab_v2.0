// O========================================================================================O

/*
    O=====================================================O
    |   Funções de models das informações dos usuários    |
    O=====================================================O

    Lista de funções:  
    - [] getLabByName
    - [] registerNewLab
    - [] addUserToLab

*/

// O========================================================================================O

// Importando módulos necessários:
const connection = require("../utils/connection");

// O========================================================================================O

const getLabByName = async (lab_name) => {
  const query = "CALL getLabByName(?)";

  const [result] = await connection.execute(query, [lab_name]);

  // Verificando se o resultado está vazio:
  if (result[0].length === 0) {
    return { status: false, data: null };
  } else {
    return { status: true, data: result[0][0] };
  }
};

// O========================================================================================O

const registerNewLab = async (lab_name, campus_id, registered_by) => {
  const query = "CALL registerNewLab(?, ?, ?)";

  const [result] = await connection.execute(query, [
    lab_name,
    registered_by,
    campus_id,
  ]);

  if (result.affectedRows === 0) {
    return { status: false };
  } else {
    return { status: true };
  }
};

// O========================================================================================O

const addUserToLab = async (lab_id, role, user_id) => {
  const query = "CALL addUserToLab(?, ?, ?)";
  const [result] = await connection.execute(query, [lab_id, role, user_id]);
  if (result.affectedRows === 0) {
    return { status: false };
  } else {
    return { status: true };
  }
};

// O========================================================================================O

// Exportando módulos:
module.exports = {
  getLabByName,
  registerNewLab,
  addUserToLab,
};

// O========================================================================================O
