// O============================================================================================O

/*
    O================================================================O
    |   Arquivo de configuração de entradas para o objeto element    |
    O================================================================O

    Lista de entradas possíveis na API:
    - [X] element_name
    - [X] element_image
    - [X] element_molar_mass
    - [X] element_quantity
    - [X] element_cas_number
    - [X] element_ec_number
    - [X] element_admin_level
    - [X] element_validity
    - [X] element_physical_state
    - [X] element_id
    - [X] elementId (URL)
    - [X] element_list
*/

// O============================================================================================O

// Definindo as validações para o objeto element:

// Validação para o nome do elemento:
const element_name = (request, response, next) => {
  const { element_name } = request.body;

  if (
    !element_name ||
    typeof element_name !== "string" ||
    element_name === "" ||
    element_name === null ||
    element_name === undefined ||
    element_name.length === 0 ||
    element_name.length > 128 ||
    element_name.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "element_name" é obrigatório e deve ser uma string não vazia, de tamanho mínimo de 0 e máximo 128 caracteres.',
      error_at: "element_name",
    });
  }

  next();
};

// Validação para a imagem do elemento:
const element_image = (request, response, next) => {
  const { element_image } = request.body;
  if (
    !element_image ||
    typeof element_image !== "string" ||
    element_image === "" ||
    element_image === null ||
    element_image === undefined ||
    element_image.length === 0 ||
    element_image.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "element_image" é obrigatório e deve ser uma string não vazia.',
      error_at: "element_image",
    });
  }

  next();
};

// Validação para a massa molar do elemento:
const element_molar_mass = (request, response, next) => {
  const { element_molar_mass } = request.body;
  if (
    !element_molar_mass ||
    typeof element_molar_mass !== "number" ||
    element_molar_mass <= 0 ||
    element_molar_mass === null ||
    element_molar_mass === undefined ||
    isNaN(element_molar_mass) ||
    !Number.isInteger(element_molar_mass)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "element_molar_mass" é obrigatório e deve ser um número positivo.',
      error_at: "element_molar_mass",
    });
  }

  next();
};

// Validação para a quantidade do elemento:
const element_quantity = (request, response, next) => {
  const { element_quantity } = request.body;
  if (
    !element_quantity ||
    typeof element_quantity !== "number" ||
    element_quantity === null ||
    element_quantity === undefined ||
    isNaN(element_quantity)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "element_quantity" é obrigatório e deve ser um número.',
      error_at: "element_quantity",
    });
  }

  next();
};

// Validação para o número CAS do elemento:
const element_cas_number = (request, response, next) => {
  const { element_cas_number } = request.body;

  if (
    !element_cas_number ||
    typeof element_cas_number !== "string" ||
    element_cas_number === "" ||
    element_cas_number === null ||
    element_cas_number === undefined ||
    element_cas_number.length === 0 ||
    element_cas_number.length > 32 ||
    element_cas_number.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "element_cas_number" é obrigatório e deve ser uma string não vazia, de tamanho mínimo de 0 e máximo 32 caracteres.',
      error_at: "element_cas_number",
    });
  }

  next();
};

// Validação para o número EC do elemento:
const element_ec_number = (request, response, next) => {
  const { element_ec_number } = request.body;

  if (
    !element_ec_number ||
    typeof element_ec_number !== "string" ||
    element_ec_number === "" ||
    element_ec_number === null ||
    element_ec_number === undefined ||
    element_ec_number.length === 0 ||
    element_ec_number.length > 32 ||
    element_ec_number.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "element_ec_number" é obrigatório e deve ser uma string não vazia, de tamanho mínimo de 0 e máximo 32 caracteres.',
      error_at: "element_ec_number",
    });
  }

  next();
};

// Validação para o nível administrativo do elemento:
const element_admin_level = (request, response, next) => {
  const { element_admin_level } = request.body;

  if (
    !element_admin_level ||
    typeof element_admin_level !== "number" ||
    element_admin_level < 1 ||
    element_admin_level > 3 ||
    element_admin_level === null ||
    element_admin_level === undefined ||
    isNaN(element_admin_level) ||
    !Number.isInteger(element_admin_level)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "element_admin_level" é obrigatório e deve ser um número inteiro entre 1 e 3.',
      error_at: "element_admin_level",
    });
  }

  next();
};

// Validação para a validade do elemento:
const element_validity = (request, response, next) => {
  const { element_validity } = request.body;

  if (
    !element_validity ||
    typeof element_validity !== "string" ||
    element_validity.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "element_validity" é obrigatório e deve ser uma string.',
      error_at: "element_validity",
    });
  }

  if (
    element_validity.length !== 10 ||
    !/^\d{2}-\d{2}-\d{4}$/.test(element_validity)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "element_validity" deve estar no formato MM-DD-YYYY.',
      error_at: "element_validity",
    });
  }

  const parts = element_validity.split("-");
  const month = parseInt(parts[0], 10);
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  const dateObject = new Date(year, month - 1, day);

  if (
    isNaN(dateObject.getTime()) ||
    dateObject.getFullYear() !== year ||
    dateObject.getMonth() !== month - 1 ||
    dateObject.getDate() !== day
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "element_validity" contém uma data inválida (não existente).',
      error_at: "element_validity",
    });
  }

  next();
};

// Validação para o estado físico do elemento:
const element_physical_state = (request, response, next) => {
  const { element_physical_state } = request.body;

  if (
    !element_physical_state ||
    typeof element_physical_state !== "string" ||
    element_physical_state.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "element_physical_state" é obrigatório e deve ser uma string.',
      error_at: "element_physical_state",
    });
  }

  const validStates = ["Sólido", "Líquido", "Gasoso"];
  if (!validStates.includes(element_physical_state)) {
    return response.status(400).json({
      status: false,
      msg: `O campo "element_physical_state" deve ser um dos seguintes valores: ${validStates.join(
        ", "
      )}.`,
      error_at: "element_physical_state",
    });
  }

  next();
};

// Validação para o ID do elemento:
const element_id = (request, response, next) => {
  const { element_id } = request.body;

  if (
    !element_id ||
    typeof element_id !== "number" ||
    element_id === null ||
    element_id === undefined ||
    element_id <= 0 ||
    !Number.isInteger(element_id) ||
    isNaN(element_id)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "element_id" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "element_id",
    });
  }

  next();
};

// Validação para o ID do elemento na URL:
const elementId = (request, response, next) => {
  const { elementId } = request.params;

  if (
    !elementId ||
    typeof elementId !== "string" ||
    elementId === "" ||
    elementId === null ||
    elementId === undefined ||
    elementId.length === 0 ||
    isNaN(elementId) ||
    !Number.isInteger(Number(elementId)) ||
    Number(elementId) <= 0
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O parâmetro "elementId" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "elementId",
    });
  }

  next();
};

// Middleware de validação para a lista de elementos:
const elements_list = (request, response, next) => {
  const { elements_list } = request.body;

  if (!elements_list || !Array.isArray(elements_list)) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "elements_list" é obrigatório e deve ser um array.',
      error_at: "elements_list",
    });
  }

  if (elements_list.length === 0) {
    return next();
  }
  for (const element of elements_list) {
    const { element_id, element_quantity } = element;

    if (
      element_id === null ||
      element_id === undefined ||
      typeof element_id !== "number" ||
      !Number.isInteger(element_id) ||
      element_id <= 0 ||
      isNaN(element_id)
    ) {
      return response.status(400).json({
        status: false,
        msg: `Cada item em "elements_list" deve ter um "element_id" que seja um número inteiro positivo.`,
        error_at: "elements_list",
        item_error: element,
      });
    }

    if (
      element_quantity === null ||
      element_quantity === undefined ||
      typeof element_quantity !== "number" ||
      !Number.isInteger(element_quantity) ||
      element_quantity <= 0 ||
      isNaN(element_quantity)
    ) {
      return response.status(400).json({
        status: false,
        msg: `Cada item em "elements_list" deve ter uma "element_quantity" que seja um número inteiro positivo.`,
        error_at: "elements_list",
        item_error: element,
      });
    }
  }

  next();
};

// O============================================================================================O

// Exportando as validações para o objeto element:
module.exports = {
  element_name,
  element_image,
  element_molar_mass,
  element_quantity,
  element_cas_number,
  element_ec_number,
  element_admin_level,
  element_validity,
  element_physical_state,
  element_id,
  elementId,
  elements_list,
};

// O============================================================================================O
