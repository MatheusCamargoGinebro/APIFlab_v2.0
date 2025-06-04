// O============================================================================================O

/*
    O==================================================================O
    |   Arquivo de configuração de entradas para o objeto equipment    |
    O==================================================================O

    Lista de entradas para o objeto usuários na API:
    - [] labId
    - [] name
    - [] image
    - [] description
    - [] quantity
    - [] quality
    - [] adminLevel
    - [] equipmentId
    - [] labId (parâmetro de rota)
    - [] equipmentId (parâmetro de rota)
*/

// O============================================================================================O

// Definindo as validações para o objeto equipment:
// - labId:
const labId = (req, res, next) => {
  const { labId } = req.body;

  if (!labId || labId === "" || labId === null || labId === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "labId",
      message: "Campo labId não pode ser vazio.",
    });
  }

  if (typeof labId !== "number") {
    return res.status(400).json({
      status: false,
      error_at: "labId",
      message: "Campo labId deve ser do tipo number.",
    });
  }

  next();
};

// - name:
const name = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === "" || name === null || name === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "name",
      message: "Campo name não pode ser vazio.",
    });
  }

  if (typeof name !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "name",
      message: "Campo name deve ser do tipo string.",
    });
  }

  if (name.length > 128) {
    return res.status(400).json({
      status: false,
      error_at: "name",
      message: "Campo name deve ter no máximo 128 caracteres.",
    });
  }

  next();
};

// - image:
const image = (req, res, next) => {
  const { image } = req.body;

  if (!image || image === "" || image === null || image === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "image",
      message: "Campo image não pode ser vazio.",
    });
  }

  if (typeof image !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "image",
      message: "Campo image deve ser do tipo string.",
    });
  }

  next();
};

// - description:
const description = (req, res, next) => {
  const { description } = req.body;

  if (
    !description ||
    description === "" ||
    description === null ||
    description === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "description",
      message: "Campo description não pode ser vazio.",
    });
  }

  if (typeof description !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "description",
      message: "Campo description deve ser do tipo string.",
    });
  }

  next();
};

// - quantity:
const quantity = (req, res, next) => {
  const { quantity } = req.body;

  if (
    !quantity ||
    quantity === "" ||
    quantity === null ||
    quantity === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "quantity",
      message: "Campo quantity não pode ser vazio.",
    });
  }

  if (typeof quantity !== "number") {
    return res.status(400).json({
      status: false,
      error_at: "quantity",
      message: "Campo quantity deve ser do tipo number.",
    });
  }

  next();
};

// - quality:
const quality = (req, res, next) => {
  const { quality } = req.body;

  if (!quality || quality === "" || quality === null || quality === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "quality",
      message: "Campo quality não pode ser vazio.",
    });
  }

  if (typeof quality !== "number") {
    return res.status(400).json({
      status: false,
      error_at: "quality",
      message: "Campo quality deve ser do tipo number.",
    });
  }

  if (quality < 1 || quality > 5) {
    return res.status(400).json({
      status: false,
      error_at: "quality",
      message: "Campo quality deve estar entre 1 e 5.",
    });
  }

  next();
};

// - equipmentId (parâmetro de rota):
const equipmentId_RT = (req, res, next) => {
  const { equipmentId } = req.params;

  if (
    !equipmentId ||
    equipmentId === "" ||
    equipmentId === null ||
    equipmentId === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "equipmentId",
      message: "Campo equipmentId não pode ser vazio.",
    });
  }

  if (isNaN(equipmentId)) {
    return res.status(400).json({
      status: false,
      error_at: "equipmentId",
      message: "Campo equipmentId deve ser do tipo number.",
    });
  }

  next();
};

// - adminLevel:
const adminLevel = (req, res, next) => {
  const { adminLevel } = req.body;

  if (
    !adminLevel ||
    adminLevel === "" ||
    adminLevel === null ||
    adminLevel === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "adminLevel",
      message: "Campo adminLevel não pode ser vazio.",
    });
  }

  if (typeof adminLevel !== "number") {
    return res.status(400).json({
      status: false,
      error_at: "adminLevel",
      message: "Campo adminLevel deve ser do tipo number.",
    });
  }

  if (![1, 2, 3].includes(adminLevel)) {
    return res.status(400).json({
      status: false,
      error_at: "adminLevel",
      message: `Campo adminLevel deve ser um dos seguintes valores: ${[
        1, 2, 3,
      ].join(", ")}.`,
    });
  }

  next();
};

// O============================================================================================O

// Exportando as validações:
module.exports = {
  labId,
  name,
  image,
  description,
  quantity,
  quality,
  equipmentId_RT,
  adminLevel,
};

// O============================================================================================O
