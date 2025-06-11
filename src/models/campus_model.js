// O========================================================================================O

/*
    O===================================================O
    |   Funções de models das informações dos campus    |
    O===================================================O

    Lista de funções:  
    - [X] getAllCampus
    - [X] getCampusByName
    - [X] registerNewCampus
*/

// O========================================================================================O

// Importando módulos necessários:
const connection = require("../utils/connection");

// O========================================================================================O

const getAllCampus = async () => {
  const query = "CALL getAllCampus()";

  const [result] = await connection.execute(query);

  if (result.length === 0) {
    return { status: false, data: null };
  } else {
    return { status: true, data: result[0] };
  }
};

// O========================================================================================O

const getCampusByName = async (campus_name) => {
  const query = "CALL getCampusByName(?)";

  const [result] = await connection.execute(query, [campus_name]);

  if (result.length === 0) {
    return { status: false, data: null };
  } else {
    return { status: true, data: result[0] };
  }
};

const registerNewCampus = async (campus_name, campus_uf) => {
  const query = "CALL registerNewCampus(?, ?)";

  const [result] = await connection.execute(query, [campus_name, campus_uf]);

  if (result.affectedRows === 0) {
    return { status: false };
  } else {
    return { status: true };
  }
};

// O========================================================================================O

module.exports = {
  getAllCampus,
  getCampusByName,
  registerNewCampus,
};

// O========================================================================================O
