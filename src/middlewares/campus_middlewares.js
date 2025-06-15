// O============================================================================================O

/*
    O================================================================O
    |   Arquivo de configuração de entradas para o objeeto campus    |
    O================================================================O

    Lista de entradas possíveis na API:
    - [X] campus_name
    - [X] campus_uf
    - [X] campus_id
*/

// O============================================================================================O


// Validação para o nome do campus:
const campus_name = (request, response, next) => {
  const { campus_name } = request.body;

  if (
    typeof campus_name !== "string" ||
    campus_name.trim().length === 0 ||
    campus_name.length > 128
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "campus_name" é obrigatório e deve ser uma string não vazia, com no máximo 128 caracteres.',
      error_at: "campus_name",
    });
  }

  next();
};

// O============================================================================================O

// Validação para a UF do campus:
const campus_uf = (request, response, next) => {
  const { campus_uf } = request.body;

  if (typeof campus_uf !== "string" || campus_uf.trim().length !== 2) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "campus_uf" é obrigatório e deve ser uma string de tamanho exato de 2 caracteres.',
      error_at: "campus_uf",
    });
  }

  const UFs = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  if (!UFs.includes(campus_uf.toUpperCase())) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "campus_uf" deve ser uma sigla de estado válida.',
      error_at: "campus_uf",
    });
  }

  next();
};

// O============================================================================================O

// Validação para o ID do campus:
const campus_id = (request, response, next) => {
  const { campus_id } = request.body;

  if (!Number.isInteger(campus_id) || campus_id <= 0) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "campus_id" é obrigatório e deve ser um número inteiro positivo.',
      error_at: "campus_id",
    });
  }

  next();
};

// O============================================================================================O

// Exportando as funções de validação
module.exports = {
  campus_name,
  campus_uf,
  campus_id,
};

// O============================================================================================O
