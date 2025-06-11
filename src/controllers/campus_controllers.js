// O========================================================================================O

/*
    O===================================O
    |   Controllers do objeto campus    |
    O===================================O

    Lista de funções:  
    - [X] get_campus_list;
    - [X] register_new_campus;
*/

// O========================================================================================O

// Importando os módulos necessários:
const campus_models = require("../models/campus_model");

// O========================================================================================O

// Função para obter a lista de campi:
const get_campus_list = async (__request, response) => {
  const result = await campus_models.getAllCampus();

  if (result.status) {
    return response.status(200).json({
      status: true,
      msg: "Lista de campi obtida com sucesso.",
      campusList: result.data,
    });
  } else {
    return response.status(500).json({
      status: false,
      msg: "Erro ao obter a lista de campi.",
      campusList: null,
    });
  }
};

// Função para registrar um novo campus:
const register_new_campus = async (request, response) => {
  const { campus_name, campus_uf } = request.body;

  // Verificando se o campus já existe:
  const findCampus = await campus_models.getCampusByName(campus_name);

  if (findCampus.status && findCampus.data.length > 0) {
    return response.status(409).json({
      status: false,
      msg: "O campus já existe.",
    });
  }

  // Registrando o novo campus:
  const register = await campus_models.registerNewCampus(
    campus_name,
    campus_uf
  );

  if (register.status) {
    return response.status(201).json({
      status: true,
      msg: "Campus registrado com sucesso.",
    });
  } else {
    return response.status(500).json({
      status: false,
      msg: "Erro ao registrar o campus.",
    });
  }
};

// O========================================================================================O

module.exports = {
  get_campus_list,
  register_new_campus,
};

// O========================================================================================O
