// O========================================================================================O

/*
    O=====================================O
    |   Controllers do objeto usuários    |
    O=====================================O

    Lista de funções:  
    - [] login_user
    - [] logout_user
    - [] email_validation
    - [] email_code_validation
    - [] password_recovery
    - [] register_user
    - [] edit_user_name
    - [] edit_user_email
    - [] edit_user_password
    - [] edit_user_type
    - [] get_user_info
*/

// O========================================================================================O

// Importando os módulos necessários:
const user_models = require("../models/user_model");

// Importando o módulo de tratamento de senhas:
const bcryptjs = require("bcryptjs");

// jsonwebtoken (JWT) para autenticação:
const JWT = require("jsonwebtoken");

// O========================================================================================O

// Função para realizar o login do usuário:
const login_user = async (request, response) => {
  /* -------------------------------------------------- */

  const { user_email, user_password } = request.body;

  /* -------------------------------------------------- */

  // Verificando se o email existe no banco de dados:
  const user = await user_models.getUserByEmail(user_email);

  // Se o usuário não existir, retornamos um erro:
  if (!user.status) {
    return response.status(404).json({
      status: false,
      msg: "Usuário não encontrado.",
      token: null,
    });
  }

  /* -------------------------------------------------- */

  try {
    // Verificando se a senha está correta (versão assíncrona):
    const isPasswordValid = await bcryptjs.compare(
      user_password,
      user.data.user_password
    );

    // Se a senha estiver incorreta, retornamos um erro:
    if (!isPasswordValid) {
      return response.status(401).json({
        status: false,
        msg: "Senha incorreta.",
        token: null,
      });
    }
  } catch (error) {
    console.error("Erro ao validar senha:", error.message);
    return response.status(500).json({
      status: false,
      msg: "Erro interno ao validar senha.",
      token: null,
    });
  }

  /* -------------------------------------------------- */

  // Se a senha estiver correta, gera um token JWT:
  const token = JWT.sign(
    { user_id: user.data.user_id },
    process.env.JWT_SECRET,
    { expiresIn: 86400 }
  );

  /* -------------------------------------------------- */

  // Retornamos a resposta com o token:
  return response.status(200).json({
    status: true,
    msg: "Login realizado com sucesso.",
    token: token,
  });
};

// O============================================================O

// Função para realizar o logout do usuário:
const logout_user = async (request, response) => {
  /*-----------------------------------------------------*/

  const token = request.headers["x-access-token"];

  /*-----------------------------------------------------*/

  // Enviando o token para a blacklist (lista de bloqueio do banco de dados):
  const result = await user_models.addToBlackList(token);
  if (!result.status) {
    return response.status(500).json({
      status: false,
      msg: "Erro ao realizar logout.",
    });
  }

  /*-----------------------------------------------------*/

  // Aqui, retornamos uma resposta de sucesso.
  return response.status(200).json({
    status: true,
    msg: "Logout realizado com sucesso.",
  });
};

// O========================================================================================O

// Exportando as funções do controller:
module.exports = {
  login_user,
  logout_user,
};

// O========================================================================================O
