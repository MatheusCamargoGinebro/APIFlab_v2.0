// O============================================================================================O

/*
    O==================================================================O
    |   Arquivo de configuração de entradas para o objeeto usuários    |
    O==================================================================O

    Lista de entradas para o objeto usuários na API:
    - [] userEmail
    - [] password
    - [] codeValidation
    - [] newUserMail
    - [] newPassword
    - [] newUserName
    - [] newUserType
    - [] newUserCampus
    - [] creationToken
*/

// O============================================================================================O

// Validação da entrada userEmail:
const userEmail = (req, res, next) => {
  const { userEmail } = req.body;

  if (!userEmail || userEmail === "" || userEmail === null) {
    return res.status(400).json({
      status: false,
      error_at: "userEmail",
      message: "Campo userEmail não pode ser vazio.",
    });
  }

  if (typeof userEmail !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "userEmail",
      message: "Campo userEmail deve ser do tipo string.",
    });
  }

  next();
};

// Validação da entrada password:
const password = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === "" || password === null) {
    return res.status(400).json({
      status: false,
      error_at: "password",
      message: "Campo password não pode ser vazio.",
    });
  }

  if (typeof password !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "password",
      message: "Campo password deve ser do tipo string.",
    });
  }

  if (password.length != 60) {
    return res.status(400).json({
      status: false,
      error_at: "password",
      message: "Campo password não está formatado corretamente.",
    });
  }

  next();
};

// Validação da entrada codeValidation:
const codeValidation = (req, res, next) => {
  const { codeValidation } = req.body;

  if (!codeValidation || codeValidation === "" || codeValidation === null) {
    return res.status(400).json({
      status: false,
      error_at: "codeValidation",
      message: "Campo codeValidation não pode ser vazio.",
    });
  }

  if (typeof codeValidation !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "codeValidation",
      message: "Campo codeValidation deve ser do tipo string.",
    });
  }

  if (codeValidation.length != 5) {
    return res.status(400).json({
      status: false,
      error_at: "codeValidation",
      message: "Campo codeValidation deve ter 5 caracteres.",
    });
  }

  next();
};

// Validação da entrada newUserMail:
const newUserMail = (req, res, next) => {
  const { newUserMail } = req.body;

  if (!newUserMail || newUserMail === "" || newUserMail === null) {
    return res.status(400).json({
      status: false,
      error_at: "newUserMail",
      message: "Campo newUserMail não pode ser vazio.",
    });
  }

  if (typeof newUserMail !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "newUserMail",
      message: "Campo newUserMail deve ser do tipo string.",
    });
  }

  next();
};

// Validação da entrada newPassword:
const newPassword = (req, res, next) => {
  const { newPassword } = req.body;

  if (!newPassword || newPassword === "" || newPassword === null) {
    return res.status(400).json({
      status: false,
      error_at: "newPassword",
      message: "Campo newPassword não pode ser vazio.",
    });
  }

  if (typeof newPassword !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "newPassword",
      message: "Campo newPassword deve ser do tipo string.",
    });
  }

  if (newPassword.length != 60) {
    return res.status(400).json({
      status: false,
      error_at: "newPassword",
      message: "Campo newPassword não está formatado corretamente.",
    });
  }

  next();
};

// Validação da entrada newUserName:
const newUserName = (req, res, next) => {
  const { newUserName } = req.body;

  if (!newUserName || newUserName === "" || newUserName === null) {
    return res.status(400).json({
      status: false,
      error_at: "newUserName",
      message: "Campo newUserName não pode ser vazio.",
    });
  }

  if (typeof newUserName !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "newUserName",
      message: "Campo newUserName deve ser do tipo string.",
    });
  }

  next();
};

// Validação da entrada newUserType:
const newUserType = (req, res, next) => {
  const { newUserType } = req.body;

  if (!newUserType || newUserType === "" || newUserType === null) {
    return res.status(400).json({
      status: false,
      error_at: "newUserType",
      message: "Campo newUserType não pode ser vazio.",
    });
  }

  if (typeof newUserType !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "newUserType",
      message: "Campo newUserType deve ser do tipo string.",
    });
  }

  next();
};

// Validação da entrada newUserCampus:
const newUserCampus = (req, res, next) => {
  const { newUserCampus } = req.body;

  if (!newUserCampus || newUserCampus === "" || newUserCampus === null) {
    return res.status(400).json({
      status: false,
      error_at: "newUserCampus",
      message: "Campo newUserCampus não pode ser vazio.",
    });
  }

  if (typeof newUserCampus !== "string") {
    return res.status(400).json({
      status: false,
      error_at: "newUserCampus",
      message: "Campo newUserCampus deve ser do tipo string.",
    });
  }

  next();
};

// Validação da entrada creationToken:

// O============================================================================================O

// Exportando as validações:
module.exports = {
  userEmail,
  password,
  codeValidation,
  newUserMail,
  newPassword,
  newUserName,
  newUserType,
  newUserCampus,
};

// O============================================================================================O
