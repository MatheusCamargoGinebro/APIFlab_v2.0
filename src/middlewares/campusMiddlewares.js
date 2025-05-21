// O============================================================================================O

/*
    O================================================================O
    |   Arquivo de configuração de entradas para o objeeto campus    |
    O================================================================O

    Lista de entradas para o objeto campus na API:
    - [] newCampusName
    - [] newCampusUF
*/

// O============================================================================================O

// Validação da entrada newCampusName:
const newCampusName = (req, res, next) => {
  const { newCampusName } = req.body;

  if (!newCampusName || newCampusName === "" || newCampusName === null) {
    return res.status(400).json({
      status: false,
      error_at: "newCampusName",
      message: "Campo newCampusName não pode ser vazio.",
    });
  }

  if (typeof newCampusName !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "newCampusName",
      message: "Campo newCampusName deve ser do tipo string.",
    });
  }

  next();
};

// Validação da entrada newCampusUF:

const newCampusUF = (req, res, next) => {
  const { newCampusUF } = req.body;

  if (!newCampusUF || newCampusUF === "" || newCampusUF === null) {
    return res.status(400).json({
      status: false,
      error_at: "newCampusUF",
      message: "Campo newCampusUF não pode ser vazio.",
    });
  }

  if (typeof newCampusUF !== "string" || newCampusUF.length !== 2) {
    return res.status(400).json({
      status: false,
      error_at: "newCampusUF",
      message: "Formatação de newCampusUF está incorreta.",
    });
  }

  newCampusUF = newCampusUF.toUpperCase();

  const validUFs = [
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

  if (!validUFs.includes(newCampusUF)) {
    return res.status(400).json({
      status: false,
      error_at: "newCampusUF",
      message: "Campo newCampusUF deve ser uma UF válida.",
    });
  }

  next();
};

// O============================================================================================O

// Exportando as funções de validação
module.exports = {
  newCampusName,
  newCampusUF,
};

// O============================================================================================O
