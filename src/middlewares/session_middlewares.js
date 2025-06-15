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

// Validando a data da sessão:
const session_date = (request, response, next) => {
  const { session_date } = request.body;

  if (
    typeof session_date !== "string" ||
    session_date.trim().length !== 10 ||
    !/^\d{2}-\d{2}-\d{4}$/.test(session_date)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_date" é obrigatório e deve estar no formato MM-DD-YYYY.',
      error_at: "session_date",
    });
  }

  const [month, day, year] = session_date.split("-").map(Number);
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

// O=============================================================================================O

// Validando o horário de início da sessão:
const session_starts_at = (request, response, next) => {
  const { session_starts_at } = request.body;

  if (
    typeof session_starts_at !== "string" ||
    session_starts_at.trim().length !== 5 ||
    !/^\d{2}:\d{2}$/.test(session_starts_at)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_starts_at" é obrigatório e deve estar no formato HH:MM.',
      error_at: "session_starts_at",
    });
  }

  const [hours, minutes] = session_starts_at.split(":").map(Number);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_starts_at" contém um horário inválido.',
      error_at: "session_starts_at",
    });
  }

  next();
};

// O=============================================================================================O

// Validando o horário de término da sessão:
const session_ends_at = (request, response, next) => {
  const { session_ends_at } = request.body;

  if (
    typeof session_ends_at !== "string" ||
    session_ends_at.trim().length !== 5 ||
    !/^\d{2}:\d{2}$/.test(session_ends_at)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_ends_at" é obrigatório e deve estar no formato HH:MM.',
      error_at: "session_ends_at",
    });
  }

  const [hours, minutes] = session_ends_at.split(":").map(Number);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_ends_at" contém um horário inválido.',
      error_at: "session_ends_at",
    });
  }

  next();
};

// O=============================================================================================O

// Validando o ID da sessão (parâmetro de rota):
const session_id = (request, response, next) => {
  const { session_id } = request.body;

  if (!Number.isInteger(Number(session_id)) || Number(session_id) <= 0) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "session_id" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "session_id",
    });
  }

  next();
};

// O=============================================================================================O

// Validando o ID da sessão (parâmetro de rota):
const sessionId = (request, response, next) => {
  const { sessionId } = request.params;

  if (!Number.isInteger(Number(sessionId)) || Number(sessionId) <= 0) {
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
