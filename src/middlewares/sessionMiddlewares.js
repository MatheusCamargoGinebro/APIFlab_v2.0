// O============================================================================================O

/*
    O================================================================O
    |   Arquivo de configuração de entradas para o objeto session    |
    O================================================================O

    Lista de entradas para o objeto usuários na API:
    - [] labId
    - [] date
    - [] startsAt
    - [] endsAt
    - [] elementList
    - [] equipmentList
    - [] sessionId
    - [] sessionId (parâmetro de rota)
    - [] elements
*/

// O============================================================================================O

// Definindo as validações para o objeto session:
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

// - date (MM/DD/YYYY):
const date = (req, res, next) => {
  const { date } = req.body;

  if (!date || date === "" || date === null || date === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "date",
      message: "Campo date não pode ser vazio.",
    });
  }

  if (typeof date !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "date",
      message: "Campo date deve ser do tipo string.",
    });
  }

  // Verifica se a data está no formato MM/DD/YYYY
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json({
      status: false,
      error_at: "date",
      message: "Campo date deve estar no formato MM/DD/YYYY.",
    });
  }

  const [month, day, year] = date.split("/").map(Number);
  const isValidDate =
    month >= 1 && month <= 12 && day >= 1 && day <= 31 && year > 0;
  if (!isValidDate) {
    return res.status(400).json({
      status: false,
      error_at: "date",
      message: "Data inválida.",
    });
  }

  next();
};

// - startsAt (HH:MM):
const startsAt = (req, res, next) => {
  const { startsAt } = req.body;

  if (
    !startsAt ||
    startsAt === "" ||
    startsAt === null ||
    startsAt === undefined
  ) {
    return res.status(400).json({
      status: false,
      error_at: "startsAt",
      message: "Campo startsAt não pode ser vazio.",
    });
  }

  if (typeof startsAt !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "startsAt",
      message: "Campo startsAt deve ser do tipo string.",
    });
  }

  // Verifica se o horário está no formato HH:MM
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
  if (!timeRegex.test(startsAt)) {
    return res.status(400).json({
      status: false,
      error_at: "startsAt",
      message: "Campo startsAt deve estar no formato HH:MM.",
    });
  }

  next();
};

// - endsAt (HH:MM):

const endsAt = (req, res, next) => {
  const { endsAt } = req.body;

  if (!endsAt || endsAt === "" || endsAt === null || endsAt === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "endsAt",
      message: "Campo endsAt não pode ser vazio.",
    });
  }

  if (typeof endsAt !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "endsAt",
      message: "Campo endsAt deve ser do tipo string.",
    });
  }

  // Verifica se o horário está no formato HH:MM
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
  if (!timeRegex.test(endsAt)) {
    return res.status(400).json({
      status: false,
      error_at: "endsAt",
      message: "Campo endsAt deve estar no formato HH:MM.",
    });
  }

  next();
};

// - elementList:
const elementList = (req, res, next) => {
  const { elementList } = req.body;

  if (!elementList || elementList === null || elementList === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "elementList",
      message: "Campo elementList não pode ser vazio.",
    });
  }

  if (!Array.isArray(elementList)) {
    return res.status(400).json({
      status: false,
      error_at: "elementList",
      message: "Campo elementList deve ser do tipo array.",
    });
  }

  for (const element of elementList) {
    if (
      !element.elementId ||
      element.elementId === null ||
      element.elementId === undefined
    ) {
      return res.status(400).json({
        status: false,
        error_at: "elementList.elementId",
        message: "Campo elementId não pode ser vazio.",
      });
    }

    if (typeof element.elementId !== "number") {
      return res.status(400).json({
        status: false,
        error_at: "elementList.elementId",
        message: "Campo elementId deve ser do tipo number.",
      });
    }
  }

  next();
};

// - equipmentList:
const equipmentList = (req, res, next) => {
  const { equipmentList } = req.body;

  if (!equipmentList || equipmentList === null || equipmentList === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "equipmentList",
      message: "Campo equipmentList não pode ser vazio.",
    });
  }

  if (!Array.isArray(equipmentList)) {
    return res.status(400).json({
      status: false,
      error_at: "equipmentList",
      message: "Campo equipmentList deve ser do tipo array.",
    });
  }

  for (const equipment of equipmentList) {
    if (
      !equipment.equipmentId ||
      equipment.equipmentId === null ||
      equipment.equipmentId === undefined
    ) {
      return res.status(400).json({
        status: false,
        error_at: "equipmentList.equipmentId",
        message: "Campo equipmentId não pode ser vazio.",
      });
    }

    if (typeof equipment.equipmentId !== "number") {
      return res.status(400).json({
        status: false,
        error_at: "equipmentList.equipmentId",
        message: "Campo equipmentId deve ser do tipo number.",
      });
    }
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

// - Elements:
const elements = (req, res, next) => {
  const { elements } = req.body;

  /*     elements: [
          {
                elementId,
                quantity
          },
          ...
     ] */

  if (!elements || elements === null || elements === undefined) {
    return res.status(400).json({
      status: false,
      error_at: "elements",
      message: "Campo elements não pode ser vazio.",
    });
  }

  if (!Array.isArray(elements)) {
    return res.status(400).json({
      status: false,
      error_at: "elements",
      message: "Campo elements deve ser do tipo array.",
    });
  }

  for (const element of elements) {
    if (
      !element.elementId ||
      element.elementId === null ||
      element.elementId === undefined
    ) {
      return res.status(400).json({
        status: false,
        error_at: "elements.elementId",
        message: "Campo elementId não pode ser vazio.",
      });
    }

    if (typeof element.elementId !== "number") {
      return res.status(400).json({
        status: false,
        error_at: "elements.elementId",
        message: "Campo elementId deve ser do tipo number.",
      });
    }

    if (
      !element.quantity ||
      element.quantity === null ||
      element.quantity === undefined
    ) {
      return res.status(400).json({
        status: false,
        error_at: "elements.quantity",
        message: "Campo quantity não pode ser vazio.",
      });
    }

    if (typeof element.quantity !== "number") {
      return res.status(400).json({
        status: false,
        error_at: "elements.quantity",
        message: "Campo quantity deve ser do tipo number.",
      });
    }
  }

  next();
};

// O=============================================================================================O

// Exportando as validações para o objeto session:
module.exports = {
  labId,
  date,
  startsAt,
  endsAt,
  elementList,
  equipmentList,
  sessionId_RT,
  elements,
};

// O============================================================================================O
