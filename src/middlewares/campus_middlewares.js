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

// Definindo as validações para o objeto campus:

// Validação para o nome do campus:
const campus_name = (request, response, next) => {
  const { campus_name } = request.body;

  if (
    !campus_name ||
    typeof campus_name !== "string" ||
    campus_name === "" ||
    campus_name === null ||
    campus_name === undefined ||
    campus_name.length === 0 ||
    campus_name.length > 128 ||
    campus_name.trim() === ""
  ) {
    return response.status(400).json({
      status: false,
      msg: 'O campo "campus_name" é obrigatório e deve ser uma string não vazia, de tamanho mínimo de 0 e máximo 128 caracteres.',
      error_at: "campus_name",
    });
  }

  next();
};

// Validação para a UF do campus:
const campus_uf = (request, response, next) => {
  const { campus_uf } = request.body;

  if (
    !campus_uf ||
    typeof campus_uf !== "string" ||
    campus_uf === "" ||
    campus_uf === null ||
    campus_uf === undefined ||
    campus_uf.length !== 2
  ) {
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

// Validação para o ID do campus:
const campus_id = (request, response, next) => {
  const { campus_id } = request.body;

  if (
    !campus_id ||
    typeof campus_id !== "number" ||
    campus_id === null ||
    campus_id === undefined ||
    campus_id <= 0 ||
    !Number.isInteger(campus_id) ||
    isNaN(campus_id)
  ) {
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
