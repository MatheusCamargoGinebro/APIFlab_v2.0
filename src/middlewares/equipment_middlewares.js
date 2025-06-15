// O============================================================================================O

/*
    O==================================================================O
    |   Arquivo de configuração de entradas para o objeto equipment    |
    O==================================================================O

    Lista de entradas possíveis na API:
    - [X] equipment_name
    - [X] equipment_image
    - [X] equipment_description
    - [X] equipment_quantity
    - [X] equipment_quality
    - [X] equipment_admin_level
    - [X] equipment_equipment_id
    - [X] equipmentId (URL)
    - [X] equipment_list
*/

// O============================================================================================O

// Validação para o nome do equipamento:
const equipment_name = (request, response, next) => {
  const { equipment_name } = request.body;

  if (
    typeof equipment_name !== "string" ||
    equipment_name.trim().length === 0 ||
    equipment_name.length > 128
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipment_name" é obrigatório e deve ser uma string não vazia, com no máximo 128 caracteres.',
      error_at: "equipment_name",
    });
  }

  next();
};

// O============================================================================================O

// Validação para a imagem do equipamento:
const equipment_image = (request, response, next) => {
  const { equipment_image } = request.body;

  if (
    typeof equipment_image !== "string" ||
    equipment_image.trim().length === 0 ||
    equipment_image.length > 256
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipment_image" é obrigatório e deve ser uma string não vazia, com no máximo 256 caracteres.',
      error_at: "equipment_image",
    });
  }

  next();
};

// O============================================================================================O

// Validação para a descrição do equipamento:
const equipment_description = (request, response, next) => {
  const { equipment_description } = request.body;

  if (
    equipment_description == null ||
    (typeof equipment_description === "string" &&
      equipment_description.trim() === "")
  ) {
    return next();
  }

  if (typeof equipment_description !== "string") {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipment_description" deve ser uma string se estiver presente.',
      error_at: "equipment_description",
    });
  }

  next();
};

// O============================================================================================O

// Validação para a quantidade do equipamento:
const equipment_quantity = (request, response, next) => {
  const { equipment_quantity } = request.body;

  if (!Number.isInteger(equipment_quantity) || equipment_quantity <= 0) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipment_quantity" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "equipment_quantity",
    });
  }

  next();
};

// O============================================================================================O

// Validação para a qualidade do equipamento:
const equipment_quality = (request, response, next) => {
  const { equipment_quality } = request.body;

  if (
    !Number.isInteger(equipment_quality) ||
    equipment_quality < 1 ||
    equipment_quality > 5
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipment_quality" é obrigatório e deve ser um número inteiro entre 1 e 5.',
      error_at: "equipment_quality",
    });
  }

  next();
};

// O============================================================================================O

// Validação para o nível de administração do equipamento:
const equipment_admin_level = (request, response, next) => {
  const { equipment_admin_level } = request.body;

  if (
    !Number.isInteger(equipment_admin_level) ||
    equipment_admin_level < 1 ||
    equipment_admin_level > 3
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipment_admin_level" é obrigatório e deve ser um número inteiro entre 1 e 3.',
      error_at: "equipment_admin_level",
    });
  }

  next();
};

// O============================================================================================O

// Validação para o ID do equipamento:
const equipment_equipment_id = (request, response, next) => {
  const { equipment_equipment_id } = request.body;

  if (
    !Number.isInteger(equipment_equipment_id) ||
    equipment_equipment_id <= 0
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipment_equipment_id" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "equipment_equipment_id",
    });
  }

  next();
};

// O============================================================================================O

// Validação para o ID do equipamento na URL:
const equipmentId = (request, response, next) => {
  const { equipmentId } = request.params;

  if (!Number.isInteger(Number(equipmentId)) || Number(equipmentId) <= 0) {
    return response.status(400).json({
      status: false,
      msg: 'O parâmetro "equipmentId" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "equipmentId",
    });
  }

  next();
};

// O============================================================================================O

// Validação para a lista de equipamentos:
const equipment_list = (request, response, next) => {
  const { equipments_list } = request.body;

  if (!Array.isArray(equipments_list) || equipments_list.length === 0) {
    return next();
  }

  for (const { equipment_id } of equipments_list) {
    if (!Number.isInteger(equipment_id) || equipment_id <= 0) {
      return response.status(400).json({
        status: false,
        msg: 'O campo "equipment_id" dentro de "equipments_list" deve ser um número inteiro positivo para cada item.',
        error_at: "equipments_list",
      });
    }
  }

  next();
};

// O============================================================================================O

// Exportando as validações:
module.exports = {
  equipment_name,
  equipment_image,
  equipment_description,
  equipment_quantity,
  equipment_quality,
  equipment_admin_level,
  equipment_equipment_id,
  equipmentId,
  equipment_list,
};

// O============================================================================================O
