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
  /* -------------------------------------------------- */

  // Obtendo a lista de campi através do model:
  const result = await campus_models.getAllCampus();

  /* -------------------------------------------------- */

  // Verificando se houve erro ao obter a lista de campi:
  if (!result.status) {
    return response.status(500).json({
      status: false,
      msg: "Erro ao obter a lista de campi.",
      campusList: null,
    });
  }

  /* -------------------------------------------------- */

  // Se a lista de campi for obida com sucesso, retornamos a resposta:
  return response.status(200).json({
    status: true,
    msg: "Lista de campi obtida com sucesso.",
    campusList: result.data,
  });
};

// O============================================================O

// Função para registrar um novo campus:
const register_new_campus = async (request, response) => {
  /* -------------------------------------------------- */

  // Recebendo os dados do corpo da requisição:
  const { campus_name, campus_uf } = request.body;

  /* -------------------------------------------------- */

  // Verificando se o campus já existe:
  const findCampus = await campus_models.getCampusByName(campus_name);

  if (findCampus.status && findCampus.data.length > 0) {
    return response.status(409).json({
      status: false,
      msg: "O campus já existe.",
    });
  }

  /* -------------------------------------------------- */

  // Registrando o novo campus:
  const register = await campus_models.registerNewCampus(
    campus_name,
    campus_uf
  );

  // Verificando se houve erro ao registrar o campus:
  if (!register.status) {
    return response.status(500).json({
      status: false,
      msg: "Erro ao registrar o campus.",
    });
  }

  /* -------------------------------------------------- */

  // Se o campus for registrado com sucesso, retornamos a resposta:
  return response.status(201).json({
    status: true,
    msg: "Campus registrado com sucesso.",
  });
};

// O========================================================================================O

// Exportando as funções do controller:
module.exports = {
  get_campus_list,
  register_new_campus,
};

// O========================================================================================O
