// O========================================================================================O

/*
    O=========================================O
    |   Controllers do objeto equipamentos    |
    O=========================================O

    Lista de funções:  
    - [] RegisterElement
    - [] DeleteElement
    - [] ListLabElements
    - [] GetSessionElements
    - [] GetElementInfo
    - [] EditElementName
    - [] EditElementQuantity
    - [] EditElementCAS
    - [] EditElementEC
    - [] EditElementPhysicalState
    - [] EditElementValidity
    - [] EditElementAdministration
    - [] EditElementMolarMass
    - [] EditElementImage
*/

// O========================================================================================O

// Importando os módulos necessários:
const element_models = require("../models/element_models");

// Importando o módulo de usuários:
const user_models = require("../models/user_model");

// Importando o módulo de laboratórios:
const lab_models = require("../models/lab_model");

// Importando JWT para manipulação de tokens:
const JWT = require("jsonwebtoken");

// O========================================================================================O

// Função para registrar um novo elemento:
async function RegisterElement(request, response) {
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

  // busca as informações do usuário:
  const user = await user_models.getUserById(userId);

  // Verifica se o usuário existe:
  if (!user.status) {
    return response.status(404).json({
      status: false,
      msg: "Usuário não encontrado."
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
      msg: "Sem autorização para remover usuários do laboratório.",
    });
  }

  /* -------------------------------------------------- */

  //
}

// O========================================================================================O

// Exportando as funções do controller:
module.exports = {
  RegisterElement
};

// O========================================================================================O