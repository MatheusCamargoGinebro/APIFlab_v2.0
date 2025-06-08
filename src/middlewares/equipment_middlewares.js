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

// Definindo as validações para o objeto equipment:

// Validação para o nome do equipamento:
const equipment_name = (request, response, next) => {
  const { equipment_name } = request.body;

  if (
    !equipment_name ||
    typeof equipment_name !== "string" ||
    equipment_name === "" ||
    equipment_name === null ||
    equipment_name === undefined ||
    equipment_name.length === 0 ||
    equipment_name.length > 128 ||
    equipment_name.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipment_name" é obrigatório e deve ser uma string não vazia, de tamanho mínimo de 0 e máximo 128 caracteres.',
      error_at: "equipment_name",
    });
  }

  next();
};

// Validação para a imagem do equipamento:
const equipment_image = (request, response, next) => {
  const { equipment_image } = request.body;

  if (
    !equipment_image ||
    typeof equipment_image !== "string" ||
    equipment_image === "" ||
    equipment_image === null ||
    equipment_image === undefined ||
    equipment_image.length === 0 ||
    equipment_image.length > 256 ||
    equipment_image.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipment_image" é obrigatório e deve ser uma string não vazia, de tamanho mínimo de 0 e máximo de 256 caracteres.',
      error_at: "equipment_image",
    });
  }

  next();
};

// Validação para a descrição do equipamento:
const equipment_description = (request, response, next) => {
  const { equipment_description } = request.body;

  if (
    equipment_description === null ||
    equipment_description === undefined ||
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

// Validação para a quantidade do equipamento:
const equipment_quantity = (request, response, next) => {
  const { equipment_quantity } = request.body;

  if (
    !equipment_quantity ||
    typeof equipment_quantity !== "number" ||
    equipment_quantity <= 0 ||
    equipment_quantity === null ||
    equipment_quantity === undefined ||
    isNaN(equipment_quantity) ||
    !Number.isInteger(equipment_quantity)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipment_quantity" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "equipment_quantity",
    });
  }

  next();
};

// Validação para a qualidade do equipamento:
const equipment_quality = (request, response, next) => {
  const { equipment_quality } = request.body;

  if (
    !equipment_quality ||
    typeof equipment_quality !== "number" ||
    equipment_quality < 1 ||
    equipment_quality > 5 ||
    equipment_quality === null ||
    equipment_quality === undefined ||
    isNaN(equipment_quality) ||
    !Number.isInteger(equipment_quality)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipment_quality" é obrigatório e deve ser um número inteiro entre 1 e 5.',
      error_at: "equipment_quality",
    });
  }

  next();
};

// Validação para o nível de administração do equipamento:
const equipment_admin_level = (request, response, next) => {
  const { equipment_admin_level } = request.body;

  if (
    !equipment_admin_level ||
    typeof equipment_admin_level !== "number" ||
    equipment_admin_level < 1 ||
    equipment_admin_level > 3 ||
    equipment_admin_level === null ||
    equipment_admin_level === undefined ||
    isNaN(equipment_admin_level) ||
    !Number.isInteger(equipment_admin_level)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipment_admin_level" é obrigatório e deve ser um número inteiro entre 1 e 3.',
      error_at: "equipment_admin_level",
    });
  }

  next();
};

// Validação para o ID do equipamento:
const equipment_equipment_id = (request, response, next) => {
  const { equipment_equipment_id } = request.body;

  if (
    !equipment_equipment_id ||
    typeof equipment_equipment_id !== "number" ||
    equipment_equipment_id <= 0 ||
    equipment_equipment_id === null ||
    equipment_equipment_id === undefined ||
    isNaN(equipment_equipment_id) ||
    !Number.isInteger(equipment_equipment_id)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipment_equipment_id" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "equipment_equipment_id",
    });
  }

  next();
};

// Validação para o ID do equipamento na URL:
const equipmentId = (request, response, next) => {
  const { equipmentId } = request.params;

  if (
    !equipmentId ||
    typeof equipmentId !== "string" ||
    equipmentId === "" ||
    equipmentId === null ||
    equipmentId === undefined ||
    isNaN(Number(equipmentId)) ||
    Number(equipmentId) <= 0 ||
    !Number.isInteger(Number(equipmentId))
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O parâmetro "equipmentId" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "equipmentId",
    });
  }

  next();
};

// Validação para a lista de equipamentos:
const equipment_list = (request, response, next) => {
  const { equipments_list } = request.body;

  if (!equipments_list || !Array.isArray(equipments_list)) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "equipments_list" é obrigatório e deve ser um array.',
      error_at: "equipments_list",
    });
  }

  if (equipments_list.length === 0) {
    return next();
  }

  for (const equipment of equipments_list) {
    const { equipment_id } = equipment;

    if (
      equipment_id === null ||
      equipment_id === undefined ||
      typeof equipment_id !== "number" ||
      !Number.isInteger(equipment_id) ||
      equipment_id <= 0 ||
      isNaN(equipment_id)
    ) {
      return response.status(400).json({
        status: false,
        msg: `O campo "equipment_id" dentro de "equipments_list" deve ser um número inteiro positivo para cada item.`,
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
