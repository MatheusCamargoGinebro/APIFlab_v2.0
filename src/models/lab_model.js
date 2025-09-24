// O========================================================================================O

/*
    O=====================================================O
    |   Funções de models das informações dos usuários    |
    O=====================================================O

    Lista de funções:  
    - [X] getLabByName
    - [X] registerNewLab
    - [X] addUserToLab
    - [X] getLabById
    - [X] getUserLabRole
    - [X] deleteLabById
    - [X] getLabsByUserId 
    - [] getLabSchedule
    - [] getLabUsers
    - [] updateUserLabRole
    - [] removeUserFromLab
    

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

const getLabById = async (lab_id) => {
  const query = "CALL getLabById(?)";
  const [result] = await connection.execute(query, [lab_id]);

  // Verificando se o resultado está vazio:
  if (result[0].length === 0) {
    return { status: false, data: null };
  } else {
    return { status: true, data: result[0][0] };
  }
};

// O========================================================================================O

const getUserLabRole = async (lab_id, user_id) => {
  const query = "CALL getUserLabRole(?, ?)";
  const [result] = await connection.execute(query, [lab_id, user_id]);

  // Verificando se o resultado está vazio:
  if (result[0].length === 0) {
    return { status: false, data: null };
  } else {
    return { status: true, data: result[0][0] };
  }
};

// O========================================================================================O

const deleteLabById = async (lab_id) => {
  const query = "CALL deleteLabById(?)";
  const [result] = await connection.execute(query, [lab_id]);

  if (result.affectedRows === 0) {
    return { status: false };
  } else {
    return { status: true };
  }
};

// O========================================================================================O

const getLabsByUserId = async (user_id) => {
  const query = "CALL getLabsByUserId(?)";
  const [result] = await connection.execute(query, [user_id]);

  if (result[0].length === 0) {
    return { status: false, data: [] };
  } else {
    return { status: true, data: result[0] };
  }
};

// O========================================================================================O

const getLabSchedule = async (lab_id, date) => {
  const query = "CALL getLabSchedule(?, ?)";
  const [result] = await connection.execute(query, [lab_id, date]);

  if (result[0].length === 0) {
    return { status: false, data: [] };
  } else {
    return { status: true, data: result[0] };
  }
};

// O========================================================================================O

const getLabUsers = async (lab_id) => {
  const query = "CALL getLabUsers(?)";
  const [result] = await connection.execute(query, [lab_id]);

  if (result[0].length === 0) {
    return { status: false, data: [] };
  } else {
    return { status: true, data: result[0] };
  }
};

// O========================================================================================O

const updateUserLabRole = async (lab_id, user_id, new_role) => {
  const query = "CALL updateUserLabRole(?, ?, ?)";
  const [result] = await connection.execute(query, [lab_id, user_id, new_role]);

  if (result.affectedRows === 0) {
    return { status: false };
  } else {
    return { status: true };
  }
};

// O========================================================================================O

const removeUserFromLab = async (lab_id, user_id) => {
  const query = "CALL removeUserFromLab(?, ?)";
  const [result] = await connection.execute(query, [lab_id, user_id]);

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
  getLabById,
  getUserLabRole,
  deleteLabById,
  getLabsByUserId,
  getLabSchedule,
  getLabUsers,
  updateUserLabRole,
  removeUserFromLab
};

// O========================================================================================O
