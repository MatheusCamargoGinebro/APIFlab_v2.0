// O============================================================================================O

/*
    O=====================================================================O
    |   Arquivo de configuração de entradas para o objeto laboratórios    |
    O=====================================================================O

    Lista de entradas possíveis na API:
    - [X] lab_name
    - [X] lab_id
    - [X] labId (URL)
    - [X] date (URL)
*/

// O============================================================================================O

// Definindo as validações para o objeto laboratórios:
const lab_name = (request, response, next) => {
  const { lab_name } = request.body;

  if (
    !lab_name ||
    typeof lab_name !== "string" ||
    lab_name === "" ||
    lab_name === null ||
    lab_name === undefined ||
    lab_name.length === 0 ||
    lab_name.length > 32 ||
    lab_name.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "lab_name" é obrigatório e deve ser uma string não vazia, de tamanho mínimo de 0 e máximo 32 caracteres.',
      error_at: "lab_name",
    });
  }

  next();
};

// Validação para o ID do laboratório:
const lab_id = (request, response, next) => {
  const { lab_id } = request.body;

  if (
    !lab_id ||
    typeof lab_id !== "number" ||
    lab_id === "" ||
    lab_id === null ||
    lab_id === undefined ||
    isNaN(lab_id) ||
    lab_id < 0 ||
    !Number.isInteger(lab_id)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "lab_id" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "lab_id",
    });
  }

  next();
};

// Validação para o ID do laboratório na URL: mesma coisa do lab_id, mas sem o body
const labId = (request, response, next) => {
  const { labId } = request.params;

  if (
    !labId ||
    typeof labId !== "string" ||
    labId === "" ||
    labId === null ||
    labId === undefined ||
    isNaN(labId) ||
    labId < 0 ||
    !Number.isInteger(Number(labId))
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O parâmetro "labId" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "labId",
    });
  }

  next();
};

// Validação para a data do laboratório:
const lab_date = (request, response, next) => {
  const { date } = request.params;

  if (
    !date ||
    typeof date !== "string" ||
    date.trim() === "" ||
    date.length !== 10 ||
    !/^\d{2}-\d{2}-\d{4}$/.test(date)
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O parâmetro "date" é obrigatório e deve estar no formato MM-DD-YYYY.',
      error_at: "date",
    });
  }

  const parts = date.split("-");
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
      msg: 'O parâmetro "date" contém uma data inválida (não existente).',
      error_at: "date",
    });
  }

  next();
};
// O============================================================================================O

// Exportando as validações:
module.exports = {
    lab_name,
    lab_id,
    labId,
    lab_date,
};

// O============================================================================================O
