// O============================================================================================O

/*
    O================================================================O
    |   Arquivo de configuração de entradas para o objeto session    |
    O================================================================O

    Lista de entradas possíveis na API:
    - [] session_date
    - [] session_starts_at
    - [] session_ends_at
    - [] session_id
    - [] sessionId (parâmetro de rota)
*/

// O============================================================================================O

// Definindo as validações para o objeto session:

// Validando a data da sessão:
const session_date = (request, response, next) => {
  const { session_date } = request.body;

  if (
    !session_date ||
    typeof session_date !== "string" ||
    session_date.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_date" é obrigatório e deve ser uma string não vazia.',
      error_at: "session_date",
    });
  }

  if (session_date.length !== 10 || !/^\d{2}-\d{2}-\d{4}$/.test(session_date)) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_date" deve estar no formato MM-DD-YYYY.',
      error_at: "session_date",
    });
  }

  const parts = session_date.split("-");
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
      msg: 'O campo "session_date" contém uma data inválida (não existente).',
      error_at: "session_date",
    });
  }

  next();
};

// Validando o horário de início da sessão:
const session_starts_at = (request, response, next) => {
  const { session_starts_at } = request.body;

  if (
    !session_starts_at ||
    typeof session_starts_at !== "string" ||
    session_starts_at.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_starts_at" é obrigatório e deve ser uma string não vazia.',
      error_at: "session_starts_at",
    });
  }

  if (!/^\d{2}:\d{2}$/.test(session_starts_at)) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_starts_at" deve estar no formato HH:MM.',
      error_at: "session_starts_at",
    });
  }

  const [hours, minutes] = session_starts_at.split(":").map(Number);

  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_starts_at" contém um horário inválido.',
      error_at: "session_starts_at",
    });
  }

  next();
};

// Validando o horário de término da sessão:
const session_ends_at = (request, response, next) => {
  const { session_ends_at } = request.body;

  if (
    !session_ends_at ||
    typeof session_ends_at !== "string" ||
    session_ends_at.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_ends_at" é obrigatório e deve ser uma string não vazia.',
      error_at: "session_ends_at",
    });
  }

  if (!/^\d{2}:\d{2}$/.test(session_ends_at)) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_ends_at" deve estar no formato HH:MM.',
      error_at: "session_ends_at",
    });
  }

  const [hours, minutes] = session_ends_at.split(":").map(Number);

  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_ends_at" contém um horário inválido.',
      error_at: "session_ends_at",
    });
  }

  next();
};

// Validando o ID da sessão (parâmetro de rota):
const session_id = (request, response, next) => {
  const { session_id } = request.body;

  if (
    !session_id ||
    typeof session_id !== "string" ||
    session_id === "" ||
    session_id === null ||
    session_id === undefined ||
    isNaN(session_id) ||
    session_id < 0 ||
    !Number.isInteger(Number(session_id))
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_id" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "session_id",
    });
  }

  next();
};

// Validando o ID da sessão (parâmetro de rota):
const sessionId = (request, response, next) => {
  const { sessionId } = request.params;

  if (
    !sessionId ||
    typeof sessionId !== "string" ||
    sessionId === "" ||
    sessionId === null ||
    sessionId === undefined ||
    isNaN(sessionId) ||
    sessionId < 0 ||
    !Number.isInteger(Number(sessionId))
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O parâmetro "sessionId" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "sessionId",
    });
  }

  next();
};

// O=============================================================================================O

// Exportando as validações para o objeto session:
module.exports = {
  session_date,
  session_starts_at,
  session_ends_at,
  session_id,
  sessionId,
};

// O============================================================================================O
