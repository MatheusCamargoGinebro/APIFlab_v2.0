// O========================================================================================O

/*
    O=========================================O
    |   Controllers do objeto equipamentos    |
    O=========================================O

    Lista de funções:  
    - [X] register_element
    - [X] delete_element
    - [X] list_lab_elements
    - [X] get_session_elements
    - [] get_element_info
    - [] edit_element_name
    - [] edit_element_quantity
    - [] edit_element_CAS
    - [] edit_element_EC
    - [] edit_element_physical_state
    - [] edit_element_validity
    - [] edit_element_administration
    - [] edit_element_molar_mass
    - [] edit_element_image
*/

// O========================================================================================O

// Importando os módulos necessários:
const element_models = require("../models/element_models");

// Importando o módulo de laboratórios:
const lab_models = require("../models/lab_model");

// Importando JWT para manipulação de tokens:
const JWT = require("jsonwebtoken");

// Importando o módulo de sessões:
const session_models = require("../models/session_model");

// O========================================================================================O

// Função para registrar um novo elemento:
async function register_element(request, response) {
  /* -------------------------------------------------- */

  const token = request.headers['x-access-token'];

  // desmonta o token para obter o user_id:
  let userId;

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    userId = decoded.user_id
  } catch (error) {
    return response.status(401).json({
      status: false,
      msg: "Token inválido."
    });
  }

  /* -------------------------------------------------- */

  // Recebendo os dados do corpo da requisição:
  const {
    element_name,
    element_image,
    element_molar_mass,
    element_quantity,
    element_cas_number,
    element_ec_number,
    element_admin_level,
    element_validity,
    element_physical_state,
    lab_id
  } = request.body;

  /* -------------------------------------------------- */

  // Verifica se o laboratório existe:
  const existingLab = await lab_models.getLabById(lab_id);

  if (!existingLab.status) {
    return response.status(404).json({
      status: false,
      msg: "Laboratório não encontrado.",
    });
  }

  /* -------------------------------------------------- */

  // Verificando se o usuário ativo tem acesso ao laboratório:
  const userLab = await lab_models.getUserLabRole(lab_id, userId);

  if (!userLab.status || parseInt(userLab.data.user_access_level) < 2) {
    return response.status(403).json({
      status: false,
      msg: "Sem autorização para modificar inventário do laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Registrando elemento:
  const register = await element_models.registerElement(
    element_name,
    element_image,
    element_molar_mass,
    element_quantity,
    element_cas_number,
    element_ec_number,
    element_admin_level,
    element_validity,
    element_physical_state,
    lab_id
  );

  if (!register.status) {
    return response.status(500).json({
      status: false,
      msg: "Erro ao modificar inventário. Não foi possível registrar o elemento",
    });
  }

  /* -------------------------------------------------- */

  // Retorna a resposata de sucesso:
  return response.status(200).json({
    status: true,
    msg: "Elemento registrado com sucesso."
  });
}

// O========================================================================================O

// Função para deletar um elemento
async function delete_element(request, response) {
  /* -------------------------------------------------- */

  const token = request.headers['x-access-token'];

  // desmonta o token para obter o user_id:
  let userId;

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    userId = decoded.user_id
  } catch (error) {
    return response.status(401).json({
      status: false,
      msg: "Token inválido."
    });
  }

  /* -------------------------------------------------- */

  // Recebendo os dados do corpo da requisição:
  const {
    element_id
  } = request.body;

  /* -------------------------------------------------- */

  // Verificando se o elemento existe, além de descobrindo qual o seu laboratório, e se tem relação com o usuário
  const element = await element_models.getElementById(element_id);

  if (!element.status) {
    return response.status(404).json({
      status: false,
      msg: "Elemento não encontrado",
    });
  }

  /* -------------------------------------------------- */

  // Verificando se o usuário ativo tem acesso ao laboratório:
  const userLab = await lab_models.getUserLabRole(element.data.lab_id, userId);

  if (!userLab.status || parseInt(userLab.data.user_access_level) < 2) {
    return response.status(403).json({
      status: false,
      msg: "Sem autorização para remover usuários do laboratório.",
    });
  }

  /* -------------------------------------------------- */

  // Deletando elemento:
  const deleteElement = await element_models.deleteElement(element_id);

  if (!deleteElement.status) {
    return response.status(400).json({
      status: false,
      msg: "Não foi possível deletar o elemento. Erro interno."
    })
  }

  /* -------------------------------------------------- */

  // Mensagem de sucesso:
  return response.status(200).json({
    status: true,
    msg: "Elemento deletado com sucesso."
  })
}

// O========================================================================================O

//  Listar elementos de um laboratório:
async function list_lab_elements(request, response) {
  /* -------------------------------------------------- */

  const token = request.headers['x-access-token'];

  // desmonta o token para obter o user_id:
  let userId;

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    userId = decoded.user_id
  } catch (error) {
    return response.status(401).json({
      status: false,
      msg: "Token inválido."
    });
  }

  /* -------------------------------------------------- */

  // Recebendo os dados dos parâmetros da requisição:
  const { labId } = request.params;

  /* -------------------------------------------------- */

  // Verificando relação usuário-laboratório
  const userLab = await lab_models.getUserLabRole(labId, userId);

  if (!userLab.status) {
    return response.status(403).json({
      status: false,
      msg: "Usuário não tem permissão para acessar o laboratório."
    });
  }

  /* -------------------------------------------------- */

  // Lendo inventário de elementos do lab:
  const getElements = await element_models.getElementsFromLab(labId);

  if (!getElements.status) {
    return response.status(202).json({
      status: true,
      msg: "Não foram encontrados elementos no lab.",
      elementsList: []
    });
  }

  /* -------------------------------------------------- */

  return response.status(202).json({
    status: true,
    msg: "Elementos encontrados com sucesso",
    elementsList: getElements.data
  });

}

// O========================================================================================O

// 
async function get_session_elements(request, response) {
  /* -------------------------------------------------- */

  const token = request.headers['x-access-token'];

  // desmonta o token para obter o user_id:
  let userId;

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    userId = decoded.user_id
  } catch (error) {
    return response.status(401).json({
      status: false,
      msg: "Token inválido."
    });
  }

  /* -------------------------------------------------- */

  // Recebendo os dados dos parâmetros da requisição:
  const { sessionId } = request.params;

  /* -------------------------------------------------- */

  const session = await session_models.getSessionById(sessionId);

  // Verificando se o usuário tem relação com o laboratório em que a sessão está relacionada:
  const userLab = await lab_models.getUserLabRole(session.data.lab_id, userId);

  if (!userLab.status) {
    return response.status(403).json({
      status: false,
      msg: "Usuário não tem permissão para acessar essa informação."
    });
  }

  /* -------------------------------------------------- */

  const elementsBySession = await element_models.getElementsBySessionId(sessionId);

  if (!elementsBySession.status) {
    return response.status(202).json({
      status: true,
      msg: "Não foram encontrados elementos no lab.",
      elementsList: []
    });
  }

  /* -------------------------------------------------- */

  return response.status(202).json({
    status: true,
    msg: "Elementos encontrados com sucesso",
    elementsList: elementsBySession.data
  });
}

// O========================================================================================O

// 
async function get_element_info(request, response) { }

// O========================================================================================O

// 
async function edit_element_name(request, response) { }

// O========================================================================================O

// 
async function edit_element_quantity(request, response) { }

// O========================================================================================O

// 
async function edit_element_CAS(request, response) { }

// O========================================================================================O

// 
async function edit_element_EC(request, response) { }

// O========================================================================================O

// 
async function edit_element_physical_state(request, response) { }

// O========================================================================================O

// 
async function edit_element_validity(request, response) { }

// O========================================================================================O

// 
async function edit_element_administration(request, response) { }

// O========================================================================================O

// 
async function edit_element_molar_mass(request, response) { }

// O========================================================================================O

// 
async function edit_element_image(request, response) { }

// O========================================================================================O

// Exportando as funções do controller:
module.exports = {
  register_element,
  delete_element,
  list_lab_elements,
  get_session_elements,
  get_element_info,
  edit_element_name,
  edit_element_quantity,
  edit_element_CAS,
  edit_element_EC,
  edit_element_physical_state,
  edit_element_validity,
  edit_element_administration,
  edit_element_molar_mass,
  edit_element_image,
};

// O========================================================================================O