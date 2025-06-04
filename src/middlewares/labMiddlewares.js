// O============================================================================================O

/*
    O==================================================================O
    |   Arquivo de configuração de entradas para o objeeto usuários    |
    O==================================================================O

    Lista de entradas para o objeto usuários na API:
    - [] userId
    - [] adminLevel
    - [] labId
    - [] labId (parâmetro de rota)
    - [] date (DD/MM/AAAA) (parâmetro de rota)
    - [] labName
*/

// O============================================================================================O

// Definindo as validações para o objeto usuários:

// - userId:
const userId = (req, res, next) => {
  const { userId } = req.body;

  if (!userId || userId === NaN || userId === null || userId === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "userId",
      message: "Campo userId não pode ser vazio.",
    });
  }

  if (typeof userId !== "integer") {
    return res.status(400).json({
      status: false,
      error_at: "userId",
      message: "Campo userId deve ser do tipo inteiro.",
    });
  }

  next();
};

// - adminLevel:
const adminLevel = (req, res, next) => {
  const { adminLevel } = req.body;

  if (
    !adminLevel ||
    adminLevel === NaN ||
    adminLevel === null ||
    adminLevel === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "adminLevel",
      message: "Campo adminLevel não pode ser vazio.",
    });
  }

  if (typeof adminLevel !== "integer") {
    return res.status(400).json({
      status: false,
      error_at: "adminLevel",
      message: "Campo adminLevel deve ser do tipo inteiro.",
    });
  }

  next();
};

// - labId:
const labId = (req, res, next) => {
  const { labId } = req.body;

  if (!labId || labId === NaN || labId === null || labId === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "labId",
      message: "Campo labId não pode ser vazio.",
    });
  }

  if (typeof labId !== "integer") {
    return res.status(400).json({
      status: false,
      error_at: "labId",
      message: "Campo labId deve ser do tipo inteiro.",
    });
  }

  next();
};

// labId por parâmetro de rota:
const labIdParam = (req, res, next) => {
  const { labId } = req.params;

  if (!labId || labId === NaN || labId === null || labId === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "labId",
      message: "Campo labId não pode ser vazio.",
    });
  }

  if (typeof labId !== "integer") {
    return res.status(400).json({
      status: false,
      error_at: "labId",
      message: "Campo labId deve ser do tipo inteiro.",
    });
  }

  next();
};

// date (DD/MM/AAAA) por parâmetro de rota:
const dateParam = (req, res, next) => {
  const { date } = req.params;

  if (!date || date === "" || date === null || date === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "date",
      message: "Campo date não pode ser vazio.",
    });
  }

  // Verifica se a data está no formato DD/MM/AAAA
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!regex.test(date)) {
    return res.status(400).json({
      status: false,
      error_at: "date",
      message: "Campo date deve estar no formato DD/MM/AAAA.",
    });
  }

  next();
};

// - labName:
const labName = (req, res, next) => {
  const { labName } = req.body;

  if (!labName || labName === "" || labName === null || labName === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "labName",
      message: "Campo labName não pode ser vazio.",
    });
  }

  if (typeof labName !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "labName",
      message: "Campo labName deve ser do tipo string.",
    });
  }

  next();
};

// O============================================================================================O

// Exportando as validações:
module.exports = {
  userId,
  adminLevel,
  labId,
  labIdParam,
  dateParam,
  labName,
};

// O============================================================================================O
