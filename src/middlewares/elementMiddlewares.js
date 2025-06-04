// O============================================================================================O

/*
    O================================================================O
    |   Arquivo de configuração de entradas para o objeto element    |
    O================================================================O

    Lista de entradas para o objeto usuários na API:
    - [] name
    - [] image
    - [] molarMass
    - [] quantity
    - [] casNumber
    - [] ecNumber
    - [] adminLevel
    - [] validity
    - [] physicalState
    - [] elementId
    - [] labId (parâmetro de rota)
    - [] sessionId (parâmetro de rota)
    - [] elementId (parâmetro de rota)
*/

// O============================================================================================O

// // Definindo as validações para o objeto element:

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

  if (image.length > 256) {
    return res.status(400).json({
      status: false,
      error_at: "image",
      message: "Campo image deve ter no máximo 256 caracteres.",
    });
  }

  next();
};

// - molarMass:
const molarMass = (req, res, next) => {
  const { molarMass } = req.body;

  if (
    !molarMass ||
    molarMass === NaN ||
    molarMass === null ||
    molarMass === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "molarMass",
      message: "Campo molarMass não pode ser vazio.",
    });
  }

  if (typeof molarMass !== "number") {
    return res.status(400).json({
      status: false,
      error_at: "molarMass",
      message: "Campo molarMass deve ser do tipo number.",
    });
  }

  next();
};

// - quantity:
const quantity = (req, res, next) => {
  const { quantity } = req.body;

  if (
    !quantity ||
    quantity === NaN ||
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

// - casNumber:
const casNumber = (req, res, next) => {
  const { casNumber } = req.body;

  if (
    !casNumber ||
    casNumber === "" ||
    casNumber === null ||
    casNumber === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "casNumber",
      message: "Campo casNumber não pode ser vazio.",
    });
  }

  if (typeof casNumber !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "casNumber",
      message: "Campo casNumber deve ser do tipo string.",
    });
  }

  if (casNumber.length > 32) {
    return res.status(400).json({
      status: false,
      error_at: "casNumber",
      message: "Campo casNumber deve ter no máximo 32 caracteres.",
    });
  }

  next();
};

// - ecNumber:
const ecNumber = (req, res, next) => {
  const { ecNumber } = req.body;

  if (
    !ecNumber ||
    ecNumber === "" ||
    ecNumber === null ||
    ecNumber === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "ecNumber",
      message: "Campo ecNumber não pode ser vazio.",
    });
  }

  if (typeof ecNumber !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "ecNumber",
      message: "Campo ecNumber deve ser do tipo string.",
    });
  }

  if (ecNumber.length > 32) {
    return res.status(400).json({
      status: false,
      error_at: "ecNumber",
      message: "Campo ecNumber deve ter no máximo 32 caracteres.",
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

  if (typeof adminLevel !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "adminLevel",
      message: "Campo adminLevel deve ser do tipo string.",
    });
  }

  if (adminLevel.length > 32) {
    return res.status(400).json({
      status: false,
      error_at: "adminLevel",
      message: "Campo adminLevel deve ter no máximo 32 caracteres.",
    });
  }

  next();
};

// - validity:
const validity = (req, res, next) => {
  const { validity } = req.body;

  if (
    !validity ||
    validity === "" ||
    validity === null ||
    validity === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "validity",
      message: "Campo validity não pode ser vazio.",
    });
  }

  if (isNaN(Date.parse(validity))) {
    return res.status(400).json({
      status: false,
      error_at: "validity",
      message: "Campo validity deve ser uma data válida.",
    });
  }

  next();
};

// - physicalState:
const physicalState = (req, res, next) => {
  const { physicalState } = req.body;

  if (
    !physicalState ||
    physicalState === "" ||
    physicalState === null ||
    physicalState === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "physicalState",
      message: "Campo physicalState não pode ser vazio.",
    });
  }

  const validStates = ["Sólido", "Líquido", "Gasoso"];
  if (!validStates.includes(physicalState)) {
    return res.status(400).json({
      status: false,
      error_at: "physicalState",
      message: `Campo physicalState deve ser um dos seguintes valores: ${validStates.join(
        ", "
      )}.`,
    });
  }

  next();
};

const elementId = (req, res, next) => {
  const { elementId } = req.body;

  if (
    !elementId ||
    elementId === NaN ||
    elementId === null ||
    elementId === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "elementId",
      message: "Campo elementId não pode ser vazio.",
    });
  }

  if (isNaN(Number(elementId))) {
    return res.status(400).json({
      status: false,
      error_at: "elementId",
      message: "Campo elementId deve ser do tipo inteiro.",
    });
  }

  next();
};

// - elementId (parâmetro de rota):
const elementId_RT = (req, res, next) => {
  const { elementId } = req.params;

  if (
    !elementId ||
    elementId === NaN ||
    elementId === null ||
    elementId === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "elementId",
      message: "Campo elementId não pode ser vazio.",
    });
  }

  if (isNaN(Number(elementId))) {
    return res.status(400).json({
      status: false,
      error_at: "elementId",
      message: "Campo elementId deve ser do tipo inteiro.",
    });
  }

  next();
};

// - labId (parâmetro de rota):
const labId_RT = (req, res, next) => {
  const { labId } = req.params;

  if (!labId || labId === NaN || labId === null || labId === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "labId",
      message: "Campo labId não pode ser vazio.",
    });
  }

  if (isNaN(Number(labId))) {
    return res.status(400).json({
      status: false,
      error_at: "labId",
      message: "Campo labId deve ser do tipo inteiro.",
    });
  }

  next();
};

// - sessionId (parâmetro de rota):
const sessionId_RT = (req, res, next) => {
  const { sessionId } = req.params;

  if (
    !sessionId ||
    sessionId === NaN ||
    sessionId === null ||
    sessionId === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "sessionId",
      message: "Campo sessionId não pode ser vazio.",
    });
  }

  if (isNaN(Number(sessionId))) {
    return res.status(400).json({
      status: false,
      error_at: "sessionId",
      message: "Campo sessionId deve ser do tipo inteiro.",
    });
  }

  next();
};

// O============================================================================================O

// Exportando as validações para o objeto element:
module.exports = {
  name,
  image,
  molarMass,
  quantity,
  casNumber,
  ecNumber,
  adminLevel,
  validity,
  physicalState,
  elementId,
  elementId_RT,
  labId_RT,
  sessionId_RT,
};

// O============================================================================================O
